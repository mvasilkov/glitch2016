/// <reference path="couch.d.ts" />

class Body {
    vertices: Point[]
    positions: Vec2[]
    constraints: Constraint[]
    edges: Constraint[]
    center: Vec2
    halfExtents: Vec2
    mass: number

    constructor(mass: number = 1) {
        this.vertices = []
        this.positions = []
        this.constraints = []
        this.edges = []
        this.center = new Vec2
        this.halfExtents = new Vec2
        this.mass = mass
    }

    boundingBox() {
        let xmin = 99999
        let ymin = 99999
        let xmax = -99999
        let ymax = -99999

        for (let p of this.positions) {
            if (p.x < xmin) xmin = p.x
            if (p.y < ymin) ymin = p.y
            if (p.x > xmax) xmax = p.x
            if (p.y > ymax) ymax = p.y
        }

        this.center.set((xmin + xmax) * 0.5, (ymin + ymax) * 0.5)
        this.halfExtents.set((xmax - xmin) * 0.5, (ymax - ymin) * 0.5)
    }

    _min: number
    _max: number

    project(a: Vec2) {
        this._min = 99999
        this._max = -99999

        for (let p of this.positions) {
            const product = p.dot(a)
            if (product < this._min) this._min = product
            if (product > this._max) this._max = product
        }
    }

    draw() {
        context.beginPath()

        const p0 = this.edges[0].p0
        context.moveTo(p0.x, p0.y)

        for (let {p1} of this.edges) {
            context.lineTo(p1.x, p1.y)
        }

        context.fillStyle = '#AEEA00'
        context.fill()

        this.drag()

        context.fillStyle = '#FF1744'
        context.fillRect(this.center.x - 1, this.center.y - 1, 2, 2)
    }

    drag() {
        if (pointer.dragging && !draggingPoint &&
            context.isPointInPath(pointer.x, pointer.y)) {

            let minDistance = 99999

            for (let p of this.vertices) {
                const distance = p.position.distance(pointer)
                if (distance < minDistance) {
                    minDistance = distance
                    draggingPoint = p
                }
            }
        }
    }
}
