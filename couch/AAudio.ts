/// <reference path="couch.d.ts" />

interface Window {
    SOUND(settings: (number | undefined)[]): string
}

interface AASound {
    tick: number
    count: number
    pool: HTMLAudioElement[]
}

class AAudio {
    on: boolean
    sounds: { [name: string]: AASound }

    constructor() {
        this.on = true
        this.sounds = {}
    }

    add(name: string, count: number, settings: (number | undefined)[]) {
        this.sounds[name] = {
            tick: 0,
            count: count,
            pool: [],
        }

        for (let i = 0; i < count; ++i) {
            const audio = new Audio
            audio.src = window.SOUND(settings)
            this.sounds[name].pool.push(audio)
        }
    }

    play(name: string) {
        if (!this.on) return

        const sound: AASound = this.sounds[name]

        sound.pool[sound.tick].play()
        if (++sound.tick >= sound.count) {
            sound.tick = 0
        }
    }
}


const aa = new AAudio

const isMobile = navigator.userAgent.match(/Android|iPhone|iPad/i) != null

if (isMobile) {
    aa.on = false
}
else {
    aa.add('bip', 9, [1,,0.1241,,0.1855,0.5336,,,,,,,,,,,,,1,,,0.1,,0.64])
    aa.add('die', 4, [1,0.0013,0.3576,0.0681,0.8007,0.5117,,-0.3453,0.0049,0.148,-0.2563,-0.2717,0.2608,,-0.3543,-0.1884,-0.0106,-0.0281,0.9971,-0.6629,-0.7531,0.0097,-0.0086,0.5])
    aa.add('new', 2, [1,,0.2548,,0.1007,0.7539,0.0996,-0.5302,,,,,,0.7769,-0.4436,,,,1,,,,,0.5])
    aa.add('win', 1, [1,0.0309,0.5597,0.0464,0.7472,0.369,,-0.1366,,-0.3111,,-0.1581,-0.8665,,-0.0414,0.2802,0.0258,-0.1198,0.9955,0.1759,,,-0.0005,0.64])
}
