/// <reference path="couch.d.ts" />

const startScreen = <HTMLElement>document.getElementById('home')
const startButton = <HTMLElement>document.getElementById('start')

handleResize()

startScreen.addEventListener('mousedown', cancel)
startScreen.addEventListener('touchstart', cancel)

startButton.addEventListener('mousedown', start)
startButton.addEventListener('touchstart', start)

function cancel(event: Event) {
    event.preventDefault()
    event.stopPropagation()
}

function start() {
    container.removeChild(startScreen)
}

function gameover() {
}

function reset() {
}
