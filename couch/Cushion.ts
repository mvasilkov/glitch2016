/// <reference path="couch.d.ts" />

class Cushion extends Body {
    p0: Point
    p1: Point

    constructor(x: number, y: number, width: number, height: number, mass: number = 250) {
        super(mass)

        const p0 = this.p0 = new Point(this, x, y)
        const p1 = this.p1 = new Point(this, x + width, y)
        const p2 = new StaticPoint(this, x + width, y + height)
        const p3 = new StaticPoint(this, x, y + height)

        new Constraint(this, p0, p1, 0.1, true)
        new Constraint(this, p1, p2, 0.1, true)
        new Constraint(this, p2, p3, 0.1, true)
        new Constraint(this, p3, p0, 0.1, true)

        new Constraint(this, p0, p2, 0.1)
        new Constraint(this, p1, p3, 0.1)

        bodies.push(this)
    }
}
