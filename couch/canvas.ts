/// <reference path="couch.d.ts" />

const cwidth = 960
const cheight = 540
const aspect = 16 / 9

let cscale = 1

const container = <HTMLElement>document.getElementById('container')
const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const context = <CanvasRenderingContext2D>canvas.getContext('2d')

let transformProperty = 'transform'
if (!(transformProperty in container.style)) {
    transformProperty = 'webkitTransform'
}

canvas.width = cwidth
canvas.height = cheight

context.lineWidth = 2
context.textAlign = 'center'
context.textBaseline = 'middle'

function setSize(x: HTMLElement, property: string, value: number) {
    x.style[<any>property] = `${value}px`
}

function handleResize() {
    let w = window.innerWidth
    let h = window.innerHeight

    if (w / h > aspect)
        w = h * aspect
    else
        h = w / aspect

    cscale = cwidth / w

    setSize(container, 'width', w)
    setSize(container, 'height', h)
    setSize(container, 'left', 0.5 * (window.innerWidth - w))
    setSize(container, 'top', 0.5 * (window.innerHeight - h))

    startScreen.style[<any>transformProperty] =
        endScreen.style[<any>transformProperty] = `scale(${0.5 * w / cwidth})`
}

// handleResize()
window.addEventListener('resize', handleResize)
window.addEventListener('orientationchange', handleResize)

canvas.addEventListener('contextmenu', event => {
    event.preventDefault()
})
