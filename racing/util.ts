const util = {
    clamp(x: number, min: number, max: number) {
        return x < min ? min : x > max ? max : x
    },

    sign(x: number) {
        return x < 0 ? -1 : x > 0 ? 1 : 0
    },
}
