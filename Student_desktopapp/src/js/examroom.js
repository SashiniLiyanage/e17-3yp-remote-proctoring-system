const { ipcRenderer } = require('electron')
const date = require('date-and-time');
const ipc = ipcRenderer


var api;
var savedVideo = 'No saved video'

/****************** variables **********************/

const roomName = sessionStorage.getItem('roomName');
const displayName = sessionStorage.getItem("displayName");
const userEmail = sessionStorage.getItem("email");
const bulb = document.getElementById("recButton")

var record = false;

/************* online offline array ***************/

var offlineStart = -1,
    offlineEnd = -1;
var statusArray = [];
var examdetails = {};


/************ jitsi room configurations *********************/

examdetails['roomName'] = roomName;


const domain = 'meet.jit.si';
const options = {
    roomName: roomName,
    width: 800,
    height: 475,
    userInfo: {
        email: userEmail,
        displayName: displayName,
    },
    configOverwrite: {
        startWithAudioMuted: true,
                startWithVideoMuted: true,
                enableWelcomePage: false,
                prejoinPageEnabled: false,
                disableFilmstripAutohiding: false,
                disableReactions: true,
                disableChatSmileys: true,
                disableRemoteMute: true,
                disablePolls: true,
                disableJoinLeaveSounds: true,
                connectionIndicators: {
                    disabled: true,
                },
                speakerStatsOrder: ['name'],
                remoteVideoMenu: {
                    disableKick: true,
                },
                toolbarButtons: ['camera', 'microphone', 'raisehand', 'chat', 'profile'],
                notifications: ['toolbar.talkWhileMutedPopup', 'notify.mutedTitle'],
                disabledSounds: ['E2EE_OFF_SOUND', 'E2EE_ON_SOUND', 'KNOCKING_PARTICIPANT_SOUND', 'LIVE_STREAMING_OFF_SOUND', 'LIVE_STREAMING_ON_SOUND', 'NO_AUDIO_SIGNAL_SOUND', 'NOISY_AUDIO_INPUT_SOUND', 'OUTGOING_CALL_EXPIRED_SOUND', 'OUTGOING_CALL_REJECTED_SOUND', 'OUTGOING_CALL_RINGING_SOUND', 'OUTGOING_CALL_START_SOUND', 'PARTICIPANT_JOINED_SOUND', 'PARTICIPANT_LEFT_SOUND', 'RAISE_HAND_SOUND', 'REACTION_SOUND', 'RECORDING_OFF_SOUND', 'RECORDING_ON_SOUND']

            },
            interfaceConfigOverwrite: {
                TILE_VIEW_MAX_COLUMNS: 1,
                SETTINGS_SECTIONS: ['profile'],
                // DEFAULT_BACKGROUND: '#fff',
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                VIDEO_QUALITY_LABEL_DISABLED: true,

            },

    parentNode: document.querySelector('#meet')
};



/************************ Recordings *************************/

let mediaRecorder;
let recordedBlobs;

const errorMsgElement = document.querySelector('p#errorMsg');
const downloadButton = document.querySelector('button#download');
const muteButton = document.querySelector('button#mute');
const unmuteButton = document.querySelector('button#unmute');


window.addEventListener('offline', () => {
    offlineStart = date.format(new Date(), 'MMMDD HH-mm-ss')
    offlineEnd = 0;
    record = true;
    bulb.className = 'Rec'
    mediaRecorder.resume();


})

window.addEventListener('online', () => {
    offlineEnd = date.format(new Date(), 'MMMDD HH-mm-ss')
    statusArray.push(offlineStart + " to " + offlineEnd);
    bulb.className = 'notRec'
    mediaRecorder.pause();

})

downloadButton.addEventListener('click', () => {
    api.dispose();
    mediaRecorder.resume();
    stopRecording();
    downloadButton.style.display = 'none';
    muteButton.style.display = 'none';
    unmuteButton.style.display = 'none';
    errorMsgElement.innerHTML = "Please wait..."
    examdetails['endTime'] = date.format(new Date(), 'DD MMM YYYY HH-mm-ss');


    if (offlineEnd == 0) {
        statusArray.push(offlineStart + " to until end");
    }
    if (record) {
        var time = date.format(new Date(), 'DD MMM YYYY HH_mm_ss');
        savedVideo = localStorage.getItem('email') + time;
        localStorage.setItem('disconnections', JSON.stringify({ "roomName": roomName, "disconnections": statusArray }));

    }
    examdetails['status'] = statusArray;
    examdetails['savedvideo'] = savedVideo;
    examdetails['videoPath'] = sessionStorage.getItem('videoPath');


    additem(examdetails);

    setTimeout(function() {

        if (record) {
            const blob = new Blob(recordedBlobs, {
                type: 'video/mp4'
            });
            const url = window.URL.createObjectURL(blob);

            ipc.send("download", {
                url: url,
                fileName: savedVideo
            })

            ipc.on("done", () => {
                ipc.send('dashboard');
            })

        } else {
            ipc.send('dashboard');
        }

    }, 3000)


});

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function startRecording() {
    recordedBlobs = [];
    let options = {
        mimeType: 'video/webm;codecs=vp9,opus'
    };
    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
    mediaRecorder.pause();
    downloadButton.disabled = false;
    muteButton.disabled = false;
    unmuteButton.disabled = false;
}

function stopRecording() {
    mediaRecorder.stop();
}

function handleSuccess(stream) {
    window.stream = stream;
    startRecording();

}

async function init(constraints) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    }
}


/****************** join to the exam room **************************/

document.addEventListener('DOMContentLoaded', async() => {
    const constraints = {
        audio: {
            echoCancellation: {
                exact: true,
            }
        },
        video: {
            width: 640,
            height: 360,
            frameRate: { max: 10 },
        }
    };
    console.log('Using media constraints:', constraints);

    //jitsi meeting starts here
    api = new JitsiMeetExternalAPI(domain, options);
    await init(constraints);
    examdetails['startTime'] = date.format(new Date(), 'DD MMM YYYY HH-mm-ss')
});



/****************** recently acced exams *******************/

function additem(data) {

    var items = JSON.parse(localStorage.getItem('examdetails'));
    if (!items) {
        localStorage.setItem('examdetails', JSON.stringify([data]));
    } else {
        items.unshift(data);
        localStorage.setItem('examdetails', JSON.stringify(items));
        if (items.length === 11) {
            items.pop(); //the last item in the array is removed. So length is 10
            localStorage.setItem('examdetails', JSON.stringify(items));
        }
    }

}


/************************ change theme ***********************/
if (typeof(Storage) !== "undefined" && localStorage.theme) {
    var Theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', Theme);
}



/********************** mute/ unmute ************************/

muteButton.addEventListener('click', () => {
    participantinfo = api.getParticipantsInfo();
    participantinfo.forEach(function(participant, index, arr) {
        var Pid = participant.participantId;
        var Pname = participant.displayName;
        if (!(Pname.includes("invigilator"))) {
            api.executeCommand('setParticipantVolume', Pid, 0);
            console.log(Pname)
        } else {
            api.pinParticipant(Pid);
        }
    })
})

unmuteButton.addEventListener('click', () => {
    participantinfo = api.getParticipantsInfo();
    participantinfo.forEach(function(participant, index, arr) {
        api.executeCommand('setParticipantVolume', participant.participantId, 1);

    })
})