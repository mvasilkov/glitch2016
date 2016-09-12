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

        p.x += p.x - o.x
        p.y += p.y - o.y + kGravity

        o.set(x, y)

        // screen limits
        if (p.y < -100) p.y = -100

        else if (p.y >= canvas.height + 250) {
            p.x -= (p.x - o.x) * kFrictionGround
            p.y = canvas.height - 1
        }

        if (p.x < 0) p.x = 0

        else if (p.x >= canvas.width) p.x = canvas.width - 1
    }
}
