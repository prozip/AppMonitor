var clockEle = document.getElementById("clockShow");
var cSec = 0;
var stoptime = false;
var cName = "";
var cTitle = "";
var cAppName = "";
var cTime = "";
var cThread = "";
var process = []

function currentTime() {
    return new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
    });
}

function approximateTime() {
    hour = Math.floor(cSec / 3600);
    re = cSec % 3600;
    minus = Math.floor(re / 60);
    sec = re % 60;
    if (hour > 0) {
        return hour + " hour";
    } else if (minus > 0) {
        return minus + " minus";
    } else {
        return sec + " sec";
    }
}

function checkColor() {
    if (cSec < 5) {
        return "primary"; //less than 5 sec
    } else if (cSec < 60) {
        return "success"; //less than a minus
    } else if (cSec < 300) {
        return "warning"; // less than 5 minus
    } else if (cSec < 900) {
        return "danger"; // less than 15 minus
    } else if (cSec < 3600) {
        return "secondary"; //less than an hour
    } else {
        return "dark"; // more than an hour
    }
}

function timerCycle() {
    if (stoptime == false) {
        hour = Math.floor(cSec / 3600);
        re = cSec % 3600;
        minus = Math.floor(re / 60);
        sec = re % 60;

        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minus < 10) {
            minus = "0" + minus;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        cSec += 1;
        clockEle.innerText = hour + ":" + minus + ":" + sec;
        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    cSec = 0;
}

function addToProcessList() {
    color = checkColor(cSec);
    pName = cName
    if (cTitle !== "") {
        pName = cName + " &nbsp;&ndash;&nbsp; ";
    }
    if ((cName == "") & (cTitle == "")) {
        pName = "staring...";
    }
    html = `
    <div class="item-timeline  timeline-${color}" style="cursor: pointer" onClick="showModal('${process.length}')">
    <div class="t-dot" data-original-title="" title="">
    </div>
    <div class="t-text">
    <p>${pName}<a href="#"> ${cTitle}</a></p>
    <span class="badge badge-${color}">${
        "in " + approximateTime()
    }</span>
    <p class="t-time">${currentTime()}</p>
    </div>
    </div>
    `;
    document
        .getElementById("recentActivities")
        .insertAdjacentHTML("afterbegin", html);
    cProcess = {
        name: cName,
        appName: cAppName,
        title: cTitle,
        thread: cThread,
        sTime: cTime,
        eTime: currentTime(),
        sec: cSec
    }
    process.push(cProcess)
}

function setCurrentProcess(name, appName, thread, title) {
    if (name == '') {
        name = 'Unknown Process'
    }
    document.getElementById("currentProcessName").innerText = name;
    document.getElementById("currentProcessExe").innerText = appName;
    document.getElementById("currentProcessThread").innerText = thread;
    document.getElementById("currentProcessTitle").innerText = title;
    document.getElementById("currentProcessTime").innerText = currentTime();
    addToProcessList();
    resetTimer();
    // saveToDataBase()
    cName = name;
    cAppName = appName;
    cTitle = title;
    cThread = thread;
    cTime = currentTime()
}

function setInfo(battery, disk, memory) {
    document.getElementById('BatteryInfo').innerText = battery + '%'
    document.getElementById('DiskInfo').innerText = disk + '%'
    document.getElementById('MemoryInfo').innerText = memory + '%'
    document.getElementById('BatteryInfoWidth').setAttribute('style', 'width: ' + battery + '%')
    document.getElementById('DiskInfoWidth').setAttribute('style', 'width: ' + disk + '%')
    document.getElementById('MemoryInfoWidth').setAttribute('style', 'width: ' + memory + '%')
}

function showModal(id) {

    document.getElementById('modalName').innerText = process[id].name;
    document.getElementById('modalTitle').innerText = 'title :  ' + process[id].title;
    document.getElementById('modalExe').innerText = 'exe file :  ' + process[id].appName;
    document.getElementById('modalThread').innerText = 'thread id :  ' + process[id].thread;
    document.getElementById('modalStartTime').innerText = 'start time :  ' + process[id].sTime;
    document.getElementById('modalSec').innerText = 'running time :  ' + process[id].sec;
    document.getElementById('modalEndTime').innerText = 'end time :  ' + process[id].eTime;
    document.getElementById('showModal').click()
}
timerCycle();