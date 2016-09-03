/// <reference path="couch.d.ts" />

const cwidth = 960
const cheight = 540
const aspect = 16 / 9

let cscale = 1

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
const context = <CanvasRenderingContext2D>canvas.getContext('2d')

canvas.width = cwidth
canvas.height = cheight

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

    setSize(canvas, 'width', w)
    setSize(canvas, 'height', h)
    setSize(canvas, 'left', 0.5 * (window.innerWidth - w))
    setSize(canvas, 'top', 0.5 * (window.innerHeight - h))
}

handleResize()
window.addEventListener('resize', handleResize)
window.addEventListener('orientationchange', handleResize)
