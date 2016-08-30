/// <reference path="couch.d.ts" />

class Constraint {
    parent: Body
    v0: Point
    v1: Point
    p0: Vec2
    p1: Vec2
    length: number
    stiffness: number
    edge: boolean

    constructor(parent: Body, v0: Point, v1: Point, stiffness: number, edge: boolean = false) {
        this.parent = parent
        this.v0 = v0
        this.v1 = v1
        this.p0 = v0.position
        this.p1 = v1.position
        this.length = this.p0.distance(this.p1)
        this.stiffness = stiffness
        this.edge = edge

        parent.constraints.push(this)
        if (edge) parent.edges.push(this)
        constraints.push(this)
    }

    solve() {
        register0.setSubtract(this.p0, this.p1)

        const length = register0.length()
        if (length) {
            register0.multiplyScalar(this.stiffness * (this.length - length) / length)

            this.p0.add(register0)
            this.p1.subtract(register0)
        }
    }
}
