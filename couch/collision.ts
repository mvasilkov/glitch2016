/// <reference path="couch.d.ts" />

const [sat, resolve] = (function () {
    let satDistance: number
    const satAxis = new Vec2
    let satBoundary: Constraint
    let satPoint: Point

    // Separating Axis Theorem collision test
    function sat(b0: Body, b1: Body): boolean {
        // aabb overlap test
        if (Math.abs(b1.center.x - b0.center.x) - (b0.halfExtents.x + b1.halfExtents.x) >= 0 ||
            Math.abs(b1.center.y - b0.center.y) - (b0.halfExtents.y + b1.halfExtents.y) >= 0)
            return false

        satDistance = 99999

        for (let b of [b0, b1]) {
            for (let boundary of b.boundaries) {
                register0.setNormal(boundary.p0, boundary.p1)
                b0.project(register0)
                b1.project(register0)

                let distance = (b0._min < b1._min) ? b1._min - b0._max : b0._min - b1._max
                if (distance > 0) return false

                distance *= -1 // == Math.abs(distance)
                if (distance < satDistance) {
                    satDistance = distance
                    satAxis.setTo(register0)
                    satBoundary = boundary
                }
            }
        }

        if (satBoundary.parent != b1) {
            // [b0, b1] = [b1, b0]
            const t = b0
            b0 = b1
            b1 = t
        }

        register0.setSubtract(b0.center, b1.center)
        if (register0.dot(satAxis) < 0) {
            satAxis.multiplyScalar(-1)
        }

        let minDistance = 99999

        for (let p of b0.vertices) {
            register0.setSubtract(p.position, b1.center)

            const distance = satAxis.dot(register0)
            if (distance < minDistance) {
                minDistance = distance
                satPoint = p
            }
        }

        return true
    }

    // collision resolution
    function resolve() {
        const p0 = satBoundary.p0
        const p1 = satBoundary.p1
        const o0 = satBoundary.v0.oldPosition
        const o1 = satBoundary.v1.oldPosition
        const pp = satPoint.position
        const po = satPoint.oldPosition

        register0.setMultiplyScalar(satAxis, satDistance)

        const t = (Math.abs(p0.x - p1.x) > Math.abs(p0.y - p1.y)) ?
            (pp.x - register0.x - p0.x) / (p1.x - p0.x) :
            (pp.y - register0.y - p0.y) / (p1.y - p0.y)
        const u = 1 / (t * t + (1 - t) * (1 - t))

        let m0 = satPoint.parent.mass
        let m1 = satBoundary.parent.mass
        const tm = m0 + m1
        m0 /= tm * 2
        m1 /= tm

        const k0 = (1 - t) * u * m0
        const k1 = t * u * m0

        p0.x -= register0.x * k0
        p0.y -= register0.y * k0
        p1.x -= register0.x * k1
        p1.y -= register0.y * k1

        pp.x += register0.x * m1
        pp.y += register0.y * m1

        //if (kFriction) {
        register0.set(
            pp.x - po.x - (p0.x + p1.x - o0.x - o1.x) * 0.5,
            pp.y - po.y - (p0.y + p1.y - o0.y - o1.y) * 0.5
        )
        register1.set(-satAxis.y, satAxis.x)
        register0.setMultiplyScalar(register1, register0.dot(register1))

        o0.x -= register0.x * kFriction * k0
        o0.y -= register0.y * kFriction * k0
        o1.x -= register0.x * kFriction * k1
        o1.y -= register0.y * kFriction * k1

        po.x += register0.x * kFriction * m1
        po.y += register0.y * kFriction * m1
        //}
    }

    return [sat, resolve]
} ()) as [(b0: Body, b1: Body) => boolean, () => void]
