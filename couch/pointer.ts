/// <reference path="couch.d.ts" />

interface IPointer extends IVec2 {
    dragging: boolean
    x: number
    y: number
}

const pointer: IPointer = {
    dragging: false,
    x: 0,
    y: 0,
}

interface IPointerEvent {
    clientX: number
    clientY: number
}

function setPointerPosition(event: IPointerEvent) {
    pointer.x = (event.clientX - canvas.offsetLeft) * cscale
    pointer.y = (event.clientY - canvas.offsetTop) * cscale
}

addEventListener('mousedown', event => {
    event.preventDefault()

    pointer.dragging = true
    setPointerPosition(event)
})

addEventListener('mousemove', event => {
    event.preventDefault()

    setPointerPosition(event)
})

addEventListener('mouseup', event => {
    event.preventDefault()

    pointer.dragging = false
    draggingPoint = null
})

document.addEventListener('touchstart', event => {
    event.preventDefault()

    pointer.dragging = true
    setPointerPosition(event.targetTouches[0])
})

document.addEventListener('touchmove', event => {
    event.preventDefault()

    setPointerPosition(event.targetTouches[0])
})

document.addEventListener('touchend', event => {
    event.preventDefault()

    pointer.dragging = false
    draggingPoint = null
})

document.addEventListener('touchcancel', event => {
    event.preventDefault()

    pointer.dragging = false
    draggingPoint = null
})
