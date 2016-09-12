/// <reference path="couch.d.ts" />

let FILL_COLOR: { [n: number]: string } = {}
~[
    'eee4da', 'ede0c8', 'f2b179', 'f59563',
    'f67c5f', 'f65e3b', 'edcf72', 'edcc61',
    'edc850', 'edc53f', 'edc22e'
].forEach(function (color, index) {
    FILL_COLOR[Math.pow(2, index + 1)] = '#' + color
})

function numberOfPoints(r: number) {
    return Math.min((0 | 0.04 * Math.PI * r) << 1, 16)
}

class Piece extends Body {
    n: number
    r: number
    font: string

    constructor(x: number, y: number = -40, n: number = 2, append: boolean = true) {
        super(1 + 0.2 * Math.log10(n))

        ++count[this.n = n]
        this.r = 40 + 4 * (Math.log2(n) - 1)
        this.font = `bold ${0.1 * this.r + 28}px 'Segoe UI','Helvetica Neue',sans-serif`

        const nPoints = numberOfPoints(this.r)
        const aStep = 2 * Math.PI / nPoints

        for (let i = 0; i < nPoints; ++i) {
            let a = i * aStep
            new Point(this, x + this.r * Math.cos(a), y + this.r * Math.sin(a))
        }

        for (let i = 0; i < nPoints - 1; ++i) {
            for (let j = i + 1; j < nPoints; ++j) {
                new Constraint(this, this.vertices[i], this.vertices[j], 0.005, j == i + 1)
            }
        }

        if (append) {
            this.boundingBox()

            bodies.push(this)
        }
    }

    paint(context: CanvasRenderingContext2D) {
        context.beginPath()

        let p0 = this.positions[0]
        let p1 = this.positions[1]

        context.moveTo(0.5 * (p0.x + p1.x), 0.5 * (p0.y + p1.y))

        for (let i = 1; i <= this.positions.length; ++i) {
            p0 = this.positions[i % this.positions.length]
            p1 = this.positions[(i + 1) % this.positions.length]

            context.quadraticCurveTo(p0.x, p0.y, 0.5 * (p0.x + p1.x), 0.5 * (p0.y + p1.y))
        }

        context.fillStyle = FILL_COLOR[this.n]
        context.fill()

        context.save()

        context.translate(this.center.x, this.center.y)
        context.rotate(Math.atan2(p0.y - this.center.y, p0.x - this.center.x))

        context.font = this.font
        context.fillStyle = this.n > 4 ? '#f9f6f2' : '#776e65'
        context.fillText('' + this.n, 0, 0)

        context.restore()

        this.drag()
    }

    paintLow(context: CanvasRenderingContext2D) {
        context.beginPath()

        const {p0} = this.boundaries[0]
        context.moveTo(p0.x, p0.y)

        for (let {p1} of this.boundaries) {
            context.lineTo(p1.x, p1.y)
        }

        context.fillStyle = FILL_COLOR[this.n]
        context.fill()

        context.save()

        context.translate(this.center.x, this.center.y)
        context.rotate(Math.atan2(p0.y - this.center.y, p0.x - this.center.x))

        context.font = this.font
        context.fillStyle = this.n > 4 ? '#f9f6f2' : '#776e65'
        context.fillText('' + this.n, 0, 0)

        context.restore()

        this.drag()
    }
}
