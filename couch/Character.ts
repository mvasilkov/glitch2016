/// <reference path="couch.d.ts" />

const nPoints = 10
const aStep = 2 * Math.PI / nPoints

class Character extends Body {
    constructor(x: number, y: number, r: number, mass: number) {
        super(mass)

        for (let i = 0; i < nPoints; ++i) {
            let a = i * aStep
            new Point(this, x + r * Math.cos(a), y + r * Math.sin(a))
        }

        for (let i = 0; i < nPoints - 1; ++i) {
            for (let j = i + 1; j < nPoints; ++j) {
                new Constraint(this, this.vertices[i], this.vertices[j], 0.005, j == i + 1)
            }
        }
    }
}
