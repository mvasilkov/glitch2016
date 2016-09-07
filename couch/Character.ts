/// <reference path="couch.d.ts" />

function numberOfPoints(r: number) {
    return Math.min((0 | 0.04 * Math.PI * r) << 1, 16)
}

class Character extends Body {
    n: number
    r: number

    constructor(x: number, y: number = -40, n: number = 1) {
        super(1 + 0.5 * Math.log10(n))

        ++count[this.n = n]
        this.r = 40 + 5 * Math.log2(n)

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
    }
}
