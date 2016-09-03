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

function setPointerPosition(event: MouseEvent) {
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
