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
}
