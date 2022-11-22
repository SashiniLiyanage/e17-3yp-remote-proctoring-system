---
layout: home
permalink: ./index.html

# Please update this with your repository name and title
repository-name: e17-3yp-remote-proctoring-system
title: Remote Proctoring System
---

# REMOTE PROCTORING SYSTEM

---

## TEAM
-  E/17/058, DEVINDI G.A.I, [e17058@eng.pdn.ac.lk](mailto:name@email.com)
-  E/17/190, LIYANAGE S.N, [e17190@eng.pdn.ac.lk](mailto:name@email.com)
-  E/17/369, WANNIGAMA S.B, [e17369@eng.pdn.ac.lk](mailto:name@email.com)

[//]: # (## [Image of the final hardware]) 

## CONTENT
1. [PROBLEM STATEMENT](#problem-statement)
2. [SOLUTION](#solution )
3. [SYSTEM OVERVIEW](#system-overview)
4. [LINKS](#links)



---

## PROBLEM STATEMENT

When conducting examinations where the skills of the students in a limited timeframe, it's crucial to manage the external factors affecting the performance of the students at a satisfactory level. 
However it could be challenging to manage these factors in an online environment.

## SOLUTION
##### ***REMOTE PROCTORING DEVICE***
We have come up with a single device which integrates the hardware and software components needed to conduct an examination in the currently implemented system, which will provide a seamless process for the proctors and students involved in an examination.



[//]: # (## Solution Architecture High level diagram + description)

## BASIC FEATURES

#### ***STUDENT'S UI***


https://user-images.githubusercontent.com/73728629/138657209-e3aa86d8-219f-4451-be80-c847ba2975cf.mp4


#### ***ADMINS'S UI***


https://user-images.githubusercontent.com/73728629/138657246-2625ba8d-5e1f-4238-82a9-e8800e614950.mp4


#### ***PROCTOR'S UI***


https://user-images.githubusercontent.com/73728629/138657261-dceedda0-a32f-422b-b10a-5e754c3209f1.mp4



#### ***REMOTE DEVICE***


## SYSTEM OVERVIEW
<img width="414" alt="oursystem" src="https://user-images.githubusercontent.com/73728629/203185784-42d4c70f-39c8-410b-8004-38dd592d46bd.PNG">

The device on the student's side is capable of capturing the video and audio stream from students continuously even incase of a power failure.
The proctor will be able to monitor the video and audio streams captured from all the students facing an examination through the browser application in the proctor's side.


##### ***HIGH-LEVEL SYSTEM OVERVIEW***
<img width="461" alt="system" src="https://user-images.githubusercontent.com/73728629/203185944-c27d2c75-f884-4798-98db-24dfc23c5a4a.PNG">


The system consists of three main endpoints.

* Web browser in Proctor's end
* Desktop application in Student's end
* Database and server application hosted on the Cloud
* Method used to ensure secure video/audio streaming:

HTTPS protects the user from so-called “man-in-the-middle” attacks where hackers can use vulnerabilities in these public networks to steal data as it’s being transmitted to the viewer. using HLS encryption to mask a users’ connection with the website and prevents this sort of attack.

#### ***TECHNOLOGY STACK***
<img width="528" alt="technology" src="https://user-images.githubusercontent.com/73728629/203185973-3b9acdfd-3ebd-4a08-805d-a348e0e6c941.PNG">

---

## Hardware Design
![prototype2](https://user-images.githubusercontent.com/73728629/203186356-78d25a38-f0af-4689-bab0-e216f5286a71.gif)

The proctoring device in the student's side has 2 main components.

* The raspberry pi 3B+ module with a touch screen,camera,microphone and speaker connected.
* Uninterruptible Power Supply

### Rasperry pi peripherals
![circuit1_bb](https://user-images.githubusercontent.com/73728629/203187008-217e26fa-14be-4235-9bff-87e17d123834.png)

### Uninterruptible Power Supply
![UPS 2 0_bb](https://user-images.githubusercontent.com/73728629/203187135-e19fe91b-57af-460c-8782-61d0f1fadde2.png)


## Prototype

![hardware](https://user-images.githubusercontent.com/73728629/203186218-18b3fc31-6077-492c-a820-fbdc740f9c15.png)

Hardware parts:

1. Touch screen display: When the device is powered up, you will see your desktop application and can freely navigate through the application with a stylus.
2. Camera: 5-megapixel camera with a wide-angle view.
3. Charging port: A micro USB socket that can supply 5V to the touch screen.
4. HDMI port: HDMI port that helps to display the UI on the touch screen.
5. USB ports: Can be used to connect external peripherals such as keyboard and mouse.
6. Extendable arm: Can be adjusted freely up and down as well as to the front and back to properly place your view in front of the camera.
7. UPS housing: Contains the backup battery unit which will uninterruptibly supply power to the device even in case of power failure.
8. On/Off button: Turns the device on and off
9. 12V DC jack: Connect a 12V adapter to this slot to charge the UPS unit.

## LINKS

- [Project Repository](https://github.com/cepdnaclk/e17-3yp-remote-proctoring-system)
- [Project Page](https://cepdnaclk.github.io/e17-3yp-remote-proctoring-system)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)


[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
