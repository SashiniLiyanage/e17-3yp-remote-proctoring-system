function saveData() {
    var serverIP = localStorage.getItem('serverIP')
    axios({
            method: 'get',
            url: 'http://' + serverIP + '/api/student/students/self',
            responseType: 'json',
            headers: {
                'Authorization': "BEARER " + sessionStorage.getItem('token'),
            }

        })
        .then((response) => {
            sessionStorage.setItem('name', response.data.name);
            sessionStorage.setItem('regNo', response.data.regNo);
            sessionStorage.setItem('department', response.data.department);
            sessionStorage.setItem('device', response.data.device);
            getExam();

        })
        .catch(function(error) {
            if (error.response) {
                console.log(error.response);

            };
        });
}