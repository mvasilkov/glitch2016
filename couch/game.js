/// <reference path="couch.d.ts" />
var startScreen = document.getElementById('home');
var startButton = document.getElementById('start');
var endScreen = document.getElementById('end');
var resetButton = document.getElementById('reset');
handleResize();
startScreen.addEventListener('mousedown', cancel);
startScreen.addEventListener('touchstart', cancel);
startButton.addEventListener('mousedown', start);
startButton.addEventListener('touchstart', start);
endScreen.addEventListener('mousedown', cancel);
endScreen.addEventListener('touchstart', cancel);
resetButton.addEventListener('mousedown', reset);
resetButton.addEventListener('touchstart', reset);
function cancel(event) {
    event.preventDefault();
    event.stopPropagation();
}
function start() {
    container.removeChild(startScreen);
    aa.play('new');
    if ((isMobile || cscale > 1) && document.body.requestFullscreen) {
        document.body.requestFullscreen();
    }
}
function gameover() {
    endScreen.style.display = 'block';
    aa.play('win');
}
function reset() {
    endScreen.style.display = 'none';
    aa.play('new');
    bodies = [];
    vertices = [];
    constraints = [];
    draggingPoint = null;
    pointer.dragging = false;
    init();
}
