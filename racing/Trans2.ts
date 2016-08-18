/// <reference path="racing.d.ts" />

class Trans2 {
    pos: Vec2
    m_r: Mat22

    constructor(pos?: Vec2, a: number = 0) {
        this.pos = pos ? pos.copy() : new Vec2
        this.m_r = new Mat22
        if (isFinite(a))
            this.m_r.setRot(a)
    }

    setTo(other: Trans2) {
        this.pos.setTo(other.pos)
        this.m_r.setTo(other.m_r)
    }

    compute(vec: Vec2) {
        return Vec2.add(this.pos, Vec2.multiplyMatrix(this.m_r, vec))
    }

    append(other: Trans2) {
        const pos = this.compute(other.pos)
        const m_r = Mat22.multiplyMatrix(this.m_r, other.m_r)
        const retval = new Trans2(pos, NaN)
        retval.m_r = m_r
        return retval
    }
}
