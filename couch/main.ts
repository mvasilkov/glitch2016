/// <reference path="couch.d.ts" />

const kGravity = 0.6
const kAttractiveForce = 0.1
const kNumIterations = 40
const kFriction = 0.9
const kFrictionGround = 0.6
const kViscosity = 1
const kForceDrag = 0.1

let bodies = [] as Body[]
let vertices = [] as Point[]
let constraints = [] as Constraint[]

let draggingPoint: Point | null = null

const register0 = new Vec2
const register1 = new Vec2

let stats: Stats

function mainloop() {
    stats.begin()
    context.clearRect(0, 0, cwidth, cheight)

    for (let p of vertices) {
        p.integrate()
    }

    for (let i = 0; i < bodies.length - 1; ++i) {
        const b = bodies[i]
        if (!(b instanceof Character)) continue

        const attractDistance = 2.5 * b.r
        let minDistance = 99999
        let other: Character | null = null
        let index = 0

        for (let j = i + 1; j < bodies.length; ++j) {
            const bb = bodies[j]
            if (!(bb instanceof Character)) continue
            if (b.n != bb.n) continue

            const distance = b.center.distance(bb.center)
            if (distance < attractDistance && distance < minDistance) {
                minDistance = distance
                other = bb
                index = j
            }
        }

        if (!other) continue

        const x = 0.5 * (b.center.x + other.center.x)
        const y = 0.5 * (b.center.y + other.center.y)

        if (minDistance > 2 * b.r) {
            for (let p of b.positions) {
                p.x += (x - p.x) * kAttractiveForce
                p.y += (y - p.y) * kAttractiveForce
            }

            for (let p of other.positions) {
                p.x += (x - p.x) * kAttractiveForce
                p.y += (y - p.y) * kAttractiveForce
            }
        }
        else {
            constraints = constraints.filter(c => c.parent != b && c.parent != other)
            vertices = vertices.filter(p => p.parent != b && p.parent != other)

            if (draggingPoint && (draggingPoint.parent == b || draggingPoint.parent == other)) {
                draggingPoint = null
            }

            bodies.splice(index, 1)
            bodies.splice(i, 1, new Character(x, y, b.n << 1))
        }
    }

    if (draggingPoint) {
        draggingPoint.position.x += (pointer.x - draggingPoint.position.x) * kForceDrag
        draggingPoint.position.y += (pointer.y - draggingPoint.position.y) * kForceDrag
    }

    for (let n = 0; n < kNumIterations; ++n) {
        for (let c of constraints) {
            c.solve()
        }

        for (let b of bodies) {
            b.boundingBox()
        }

        for (let i = 0; i < bodies.length - 1; ++i) {
            for (let j = i + 1; j < bodies.length; ++j) {
                if (sat(bodies[i], bodies[j])) {
                    resolve()
                }
            }
        }
    }

    for (let b of bodies) {
        b.draw()
    }

    if (draggingPoint) {
        context.beginPath()
        context.moveTo(draggingPoint.position.x, draggingPoint.position.y)
        context.lineTo(pointer.x, pointer.y)
        context.lineWidth = 2
        context.strokeStyle = '#FFD600'
        context.stroke()
    }

    stats.end()
    requestAnimationFrame(mainloop)
}

function init() {
    const x = cwidth * 0.2
    const y = cheight * 0.5

    bodies.push(new Character(x, y))
    bodies.push(new Character(x * 2, y))
    bodies.push(new Character(x * 3, y, 2))
    bodies.push(new Character(x * 4, y, 4))

    for (let b of bodies) {
        b.boundingBox()
    }

    stats = new Stats
    document.body.appendChild(stats.dom)
}
