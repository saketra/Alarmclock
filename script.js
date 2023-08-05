// variables

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("audio/Alarm-ringtone.mp3");


// script for Time and Date


function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        month = now.getMonth(),
        dnum  = now.getDate(), 
        yr = now.getFullYear(), //year
        hr = now.getHours(),  //hour
        min = now.getMinutes(),
        sec = now.getSeconds(),
        period = "AM";
        
    if(hr == 0){
        hr = 12;
    }
    if(hr>12){
        hr -=12;
        period = "PM";
    }

    Number.prototype.pad = function(digits){
        for(var n=this.toString();n.length<digits;n=0+n);
        return n;
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var week = ["Sunday", "Monday", "Tusday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
    var values = [week[dname], months[month], dnum.pad(2),yr,hr.pad(2),min.pad(2),sec.pad(2),period];

    for(var i=0; i<ids.length;i++){
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }

    for(var i=0;i<alarmListArr.length;i++){
        if(alarmListArr[i]==`${hr.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${period}`){
            console.log("Alarm ringing...");
            ring.load();
            ring.play();
            document.querySelector("#stopAlarm").style.visibility = "visible";
        }
    }

}


function initClock(){
    updateClock();
    window.setInterval("updateClock()",1000);
}


// Set Alarm section


for(let i=12;i>0;i--){
    i=i<10 ? "0"+i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option); 
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// add alarm 

function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinutes") || time.includes("AM/PM")){
        alert("Please, Select Valid Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += 
        `<div class="alarmLog" id="alarm${alarmCount}">
        <span id="span${alarmCount}">${time}</span>
        <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector("btn-delete").value);
    }
}

setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}