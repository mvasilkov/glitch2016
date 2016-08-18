/// <reference path="racing.d.ts" />

class Mat22 {
    col1: Vec2
    col2: Vec2

    constructor(col1?: Vec2, col2?: Vec2) {
        this.col1 = col1 ? col1.copy() : new Vec2
        this.col2 = col2 ? col2.copy() : new Vec2
    }

    setTo(other: Mat22) {
        this.col1.setTo(other.col1)
        this.col2.setTo(other.col2)
    }

    setRot(a: number) {
        const cos = Math.cos(a)
        const sin = Math.sin(a)

        this.col1.set(cos, sin)
        this.col2.set(-sin, cos)
    }

    static multiplyMatrix(a: Mat22, b: Mat22) {
        return new Mat22(
            Vec2.multiplyMatrix(a, b.col1),
            Vec2.multiplyMatrix(a, b.col2)
        )
    }
}
