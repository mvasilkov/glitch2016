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
    pointer.x = (event.clientX - container.offsetLeft) * cscale
    pointer.y = (event.clientY - container.offsetTop) * cscale
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
    const target = <HTMLElement>event.target
    if (target.tagName != 'INPUT' && target.tagName != 'LABEL') {
        event.preventDefault()
    }

    pointer.dragging = true
    setPointerPosition(event.targetTouches[0])
})

document.addEventListener('touchmove', event => {
    event.preventDefault()

    setPointerPosition(event.targetTouches[0])
})

document.addEventListener('touchend', event => {
    pointer.dragging = false
    draggingPoint = null
})

document.addEventListener('touchcancel', event => {
    pointer.dragging = false
    draggingPoint = null
})
