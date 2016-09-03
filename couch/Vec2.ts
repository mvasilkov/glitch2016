/// <reference path="couch.d.ts" />

interface IVec2 {
    x: number
    y: number
}

class Vec2 implements IVec2 {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
    }

    setTo(other: IVec2) {
        this.x = other.x
        this.y = other.y
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    distance(other: IVec2) {
        const x = this.x - other.x
        const y = this.y - other.y
        return Math.sqrt(x * x + y * y)
    }

    add(other: IVec2) {
        this.x += other.x
        this.y += other.y
    }

    subtract(other: IVec2) {
        this.x -= other.x
        this.y -= other.y
    }

    setSubtract(a: IVec2, b: IVec2) {
        this.x = a.x - b.x
        this.y = a.y - b.y
    }

    dot(other: IVec2) {
        return this.x * other.x + this.y * other.y
    }

    multiplyScalar(a: number) {
        this.x *= a
        this.y *= a
    }

    setMultiplyScalar(other: IVec2, a: number) {
        this.x = other.x * a
        this.y = other.y * a
    }

    setNormal(a: IVec2, b: IVec2) {
        // perpendicular
        const x = a.y - b.y
        const y = b.x - a.x

        // normalize
        const length = Math.sqrt(x * x + y * y)
        if (length < Number.MIN_VALUE) {
            this.x = x
            this.y = y
            return
        }

        const inverseLength = 1 / length
        this.x = x * inverseLength
        this.y = y * inverseLength
    }
}
