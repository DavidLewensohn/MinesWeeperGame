'use strict'

const elTimer = document.getElementById('timer')


var min = 0
var sec = 0
var isStopTime = true


function startTimer() {
    if (isStopTime) {
        isStopTime = false
        timerCycle()
    }
}

function timerCycle() {
    if (isStopTime == false) {
        sec = parseInt(sec)
        min = parseInt(min)


        sec = sec + 1

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }

        if (sec < 10 || sec == 0) sec = '0' + sec
        if (min < 10 || min == 0) min = '0' + min

        timer.innerHTML = min + ':' + sec
        setTimeout("timerCycle()", 1000)

    }
}

function stopTimer() {
    isStopTime = true
}

function resetTimer() {
    timer.innerHTML = '00:00'
}
