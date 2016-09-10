/// <reference path="couch.d.ts" />

const startScreen = <HTMLElement>document.getElementById('home')
const startButton = <HTMLElement>document.getElementById('start')
const endScreen = <HTMLElement>document.getElementById('end')
const resetButton = <HTMLElement>document.getElementById('reset')

handleResize()

startScreen.addEventListener('mousedown', cancel)
startScreen.addEventListener('touchstart', cancel)

startButton.addEventListener('mousedown', start)
startButton.addEventListener('touchstart', start)

endScreen.addEventListener('mousedown', cancel)
endScreen.addEventListener('touchstart', cancel)

resetButton.addEventListener('mousedown', reset)
resetButton.addEventListener('touchstart', reset)

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad/i) != null

function cancel(event: Event) {
    event.preventDefault()
    event.stopPropagation()
}

function start() {
    container.removeChild(startScreen)

    if ((isMobile || cscale > 1) && document.body.requestFullscreen) {
        document.body.requestFullscreen()
    }
}

function gameover() {
    endScreen.style.display = 'block'
}

function reset() {
    endScreen.style.display = 'none'

    bodies = []
    vertices = []
    constraints = []

    draggingPoint = null
    pointer.dragging = false

    init()
}
