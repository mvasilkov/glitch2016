/// <reference path="couch.d.ts" />

class StaticPoint extends Point {
    x: number
    y: number

    constructor(parent: Body, x: number, y: number) {
        super(parent, x, y)

        this.x = x
        this.y = y
    }

    integrate() {
        this.position.set(this.x, this.y)
        this.oldPosition.set(this.x, this.y)
    }
}
