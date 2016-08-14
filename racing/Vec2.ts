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
}
