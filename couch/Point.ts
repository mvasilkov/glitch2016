/// <reference path="couch.d.ts" />

class Point {
    parent: Body
    position: Vec2
    oldPosition: Vec2

    constructor(parent: Body, x: number, y: number) {
        this.parent = parent
        this.position = new Vec2(x, y)
        this.oldPosition = new Vec2(x, y)

        parent.vertices.push(this)
        parent.positions.push(this.position)
        vertices.push(this)
    }

    integrate() {
        const p = this.position
        const o = this.oldPosition
        const x = p.x
        const y = p.y

        p.x += (kViscosity * p.x - kViscosity * o.x)
        p.y += (kViscosity * p.y - kViscosity * o.y) + kGravity

        o.set(x, y)

        // screen limits
        if (p.y < 0) p.y = 0

        else if (p.y > canvas.height) {
            p.x -= (p.x - o.x) * kFrictionGround
            p.y = canvas.height
        }

        if (p.x < 0) p.x = 0

        else if (p.x > canvas.width) p.x = canvas.width
    }
}
