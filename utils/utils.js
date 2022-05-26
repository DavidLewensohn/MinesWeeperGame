'use strict'


function resetTimer() {
    timer.innerHTML = '00:00';
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}


// function myFunction() {
//     setInterval(setAlert, 5000);
// }
// function setAlert() {
//     alert("Hello World!");
// }