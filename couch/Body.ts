/// <reference path="couch.d.ts" />

abstract class Body {
    vertices: Point[]
    positions: Vec2[]
    constraints: Constraint[]
    boundaries: Constraint[]
    center: Vec2
    halfExtents: Vec2
    mass: number

    constructor(mass: number = 1) {
        this.vertices = []
        this.positions = []
        this.constraints = []
        this.boundaries = []
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

    abstract paint(context: CanvasRenderingContext2D): void

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
