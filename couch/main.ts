/// <reference path="couch.d.ts" />

const kGravity = 0.6
const kAttractiveForce = 0.1
const kNumIterations = 40
const kFriction = 0.9
const kFrictionGround = 0.6
const kForceDrag = 0.24

let bodies = [] as Body[]
let vertices = [] as Point[]
let constraints = [] as Constraint[]

let draggingPoint: Point | null = null

const register0 = new Vec2
const register1 = new Vec2

const count: { [n: number]: number } = {}

//const numberOfCushions = 3

function mainloop() {
    context.clearRect(0, 0, cwidth, cheight)

    for (let p of vertices) {
        p.integrate()
    }

    let addPieces = false

    for (let i = 3 /*numberOfCushions*/; i < bodies.length; ++i) {
        const b = bodies[i] as Piece
        //if (!(b instanceof Piece)) continue

        if (b.center.y >= cheight + b.r) {
            constraints = constraints.filter(c => c.parent != b)
            vertices = vertices.filter(p => p.parent != b)

            if (draggingPoint && draggingPoint.parent == b) {
                draggingPoint = null
                pointer.dragging = false
            }

            bodies.splice(i, 1)

            --count[b.n]

            aa.play('die')

            addPieces = true

            --i
        }
    }

    for (let i = 3 /*numberOfCushions*/; i < bodies.length - 1; ++i) {
        const b = bodies[i] as Piece
        //if (!(b instanceof Piece)) continue

        const attractDistance = 2.5 * b.r
        let minDistance = 99999
        let other: Piece | null = null
        let index = 0

        for (let j = i + 1; j < bodies.length; ++j) {
            const bb = bodies[j] as Piece
            //if (!(bb instanceof Piece)) continue
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
                pointer.dragging = false
            }

            bodies.splice(index, 1)
            bodies[i] = new Piece(x, y, b.n << 1, false)

            count[b.n] -= 2

            aa.play('bip')

            addPieces = true

            if (b.n == 1024) {
                gameover()
            }
        }
    }

    if (addPieces) {
        addPiecesRateLimit()
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
        b.paint(context)
    }

    if (draggingPoint) {
        context.beginPath()
        context.moveTo(draggingPoint.position.x, draggingPoint.position.y)
        context.lineTo(pointer.x, pointer.y)
        context.strokeStyle = '#FFD600'
        context.stroke()
    }

    requestAnimationFrame(mainloop)
}

function spawnLocation() {
    return (Math.random() * 0.3 + 0.35) * cwidth
}

const addPiecesRateLimit = debounce(function () {
    const has256 = count[256] || count[512] || count[1024]

    if (count[2]) {
        new Piece(spawnLocation())
    }
    else if (count[4]) {
        new Piece(spawnLocation(), -44, 4)
    }
    else if (has256) {
        if (count[8]) {
            new Piece(spawnLocation(), -48, 8)
        }
        else {
            new Piece(0.35 * cwidth, -44, 4)
            new Piece(0.65 * cwidth, -44, 4)
        }
    }
    else {
        new Piece(0.35 * cwidth)
        new Piece(0.65 * cwidth)
    }

    aa.play('new')
}, 300)

let couch: Cushion | null = null
let armrest0: Cushion | null = null
let armrest1: Cushion | null = null

function init() {
    for (let n = 2; n <= 2048; n *= 2) {
        count[n] = 0
    }

    couch = new Cushion(280, 480, 400, 60)
    armrest0 = new Cushion(220, 420, 60, 120)
    armrest1 = new Cushion(680, 420, 60, 120)

    new Constraint(couch, couch.handle0, armrest0.handle0, 0.1)
    new Constraint(couch, couch.handle1, armrest1.handle1, 0.1)

    const y = cheight * 0.5

    new Piece(0.35 * cwidth, y)
    new Piece(0.65 * cwidth, y)
}
