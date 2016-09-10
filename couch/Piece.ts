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

    constructor(x: number, y: number = -40, n: number = 2, append: boolean = true) {
        super(1 + 0.5 * Math.log10(n))

        ++count[this.n = n]
        this.r = 40 + 5 * (Math.log2(n) - 1)

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

    draw() {
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

        this.drag()
    }
}
