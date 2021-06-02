var clockEle = document.getElementById("clockShow");
var cSec = 0;
var stoptime = false;
var cName = "";
var cTitle = "";
var cAppName = "";

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
    if (cName == "") {
        cName = cAppName;
    }
    if (cTitle !== "") {
        cName = cName + " &nbsp;&ndash;&nbsp; ";
    }
    if ((cName == "") & (cTitle == "")) {
        cName = "staring...";
    }
    html = `
        <div class="item-timeline  timeline-${color}" style="cursor: pointer">
            <div class="t-dot" data-original-title="" title="">
            </div>
            <div class="t-text">
                <p>${cName}<a href="#"> ${cTitle}</a></p>
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
}

function setCurrentProcess(name, appName, thread, title) {
    if (name == '') {
        document.getElementById("currentProcessName").innerText = 'Unknown Process'
    } else {
        document.getElementById("currentProcessName").innerText = name;
    }
    document.getElementById("currentProcessExe").innerText = appName;
    document.getElementById("currentProcessThread").innerText = thread;
    document.getElementById("currentProcessTitle").innerText = title;
    document.getElementById("currentProcessTime").innerText = currentTime();
    addToProcessList();
    resetTimer();
    // saveToDataBase()
    cName = name;
    cTitle = title;
    cAppName = appName;
}

function setInfo(battery, disk, memory) {
    document.getElementById('BatteryInfo').innerText = battery + '%'
    document.getElementById('DiskInfo').innerText = disk + '%'
    document.getElementById('MemoryInfo').innerText = memory + '%'
    document.getElementById('BatteryInfoWidth').setAttribute('style', 'width: ' + battery + '%')
    document.getElementById('DiskInfoWidth').setAttribute('style', 'width: ' + disk + '%')
    document.getElementById('MemoryInfoWidth').setAttribute('style', 'width: ' + memory + '%')
}

timerCycle();