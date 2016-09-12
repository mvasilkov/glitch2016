/// <reference path="couch.d.ts" />

const loadingScreen = <HTMLElement>document.getElementById('load')
const startScreen = <HTMLElement>document.getElementById('home')
const startButton = <HTMLElement>document.getElementById('start')
const endScreen = <HTMLElement>document.getElementById('end')
const resetButton = <HTMLElement>document.getElementById('reset')

startScreen.addEventListener('mousedown', cancel)
startScreen.addEventListener('touchstart', cancel)

startButton.addEventListener('mousedown', start)
startButton.addEventListener('touchstart', start)

endScreen.addEventListener('mousedown', cancel)
endScreen.addEventListener('touchstart', cancel)

resetButton.addEventListener('mousedown', reset)
resetButton.addEventListener('touchstart', reset)

function cancel(event: Event) {
    const target = <HTMLElement>event.target
    if (target.tagName != 'INPUT' && target.tagName != 'LABEL') {
        event.preventDefault()
        event.stopPropagation()
    }
}

function start() {
    container.removeChild(startScreen)

    aa.play('new')

    if ((isMobile || cscale > 1) && document.body.requestFullscreen) {
        document.body.requestFullscreen()
    }
}

function gameover() {
    endScreen.style.display = 'block'

    aa.play('win')
}

function reset() {
    endScreen.style.display = 'none'

    aa.play('new')

    bodies = []
    vertices = []
    constraints = []

    draggingPoint = null
    pointer.dragging = false

    init()
}
