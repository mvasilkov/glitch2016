/// <reference path="racing.d.ts" />

class Vec2 {
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

    setTo(other: Vec2) {
        this.x = other.x
        this.y = other.y
    }

    copy() {
        return new Vec2(this.x, this.y)
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize() {
        const length = this.length()
        if (length < Number.MIN_VALUE)
            return

        const inverseLength = 1 / length
        this.x *= inverseLength
        this.y *= inverseLength
    }

    add(other: Vec2) {
        this.x += other.x
        this.y += other.y
    }

    multiplyScalar(a: number) {
        this.x *= a
        this.y *= a
    }

    multiplyMatrix(mat: Mat22) {
        this.set(
            mat.col1.x * this.x + mat.col2.x * this.y,
            mat.col1.y * this.x + mat.col2.y * this.y
        )
    }

    static add(a: Vec2, b: Vec2) {
        return new Vec2(a.x + b.x, a.y + b.y)
    }

    static multiplyScalar(a: number, b: Vec2) {
        return new Vec2(a * b.x, a * b.y)
    }

    static multiplyMatrix(a: Mat22, b: Vec2) {
        return new Vec2(
            a.col1.x * b.x + a.col2.x * b.y,
            a.col1.y * b.x + a.col2.y * b.y
        )
    }
}
