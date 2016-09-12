/// <reference path="couch.d.ts" />

let music: HTMLAudioElement | null = null

function initMusic() {
    const synth = new sonant
    for (let i = 0; i < 8; ++i) {
        synth.generate(i)
    }
    music = synth.createAudio()
    music.loop = true
    music.volume = 0.9
}

if (!isMobile) {
    try {
        initMusic()
    }
    catch (err) {
    }
}


function initMainMenu() {
    if (isMobile) document.body.className = 'mobile'

    const musicToggle = <HTMLInputElement>document.getElementById('m')
    const soundToggle = <HTMLInputElement>document.getElementById('s')
    const qualityToggle = <HTMLInputElement>document.getElementById('q')

    musicToggle.addEventListener('change', event => {
        if (!music) return

        if (musicToggle.checked) {
            music.currentTime = 0
            music.play()
        }
        else music.pause()
    })

    soundToggle.addEventListener('change', event => {
        aa.on = soundToggle.checked
    })

    const _cpaint = Cushion.prototype.paint
    const _cpaintLow = Cushion.prototype.paintLow
    const _ppaint = Piece.prototype.paint
    const _ppaintLow = Piece.prototype.paintLow

    if (isMobile) {
        qualityToggle.checked = false
        Cushion.prototype.paint = _cpaintLow
        Piece.prototype.paint = _ppaintLow
    }

    qualityToggle.addEventListener('change', event => {
        Cushion.prototype.paint = qualityToggle.checked ? _cpaint : _cpaintLow
        Piece.prototype.paint = qualityToggle.checked ? _ppaint : _ppaintLow
        paintBackground()
    })

    container.removeChild(loadingScreen)
    if (music) music.play()
}

handleResize()

initMainMenu()
init()
initBackground()

requestAnimationFrame(mainloop)
paintBackground()
