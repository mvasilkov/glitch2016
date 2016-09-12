/// <reference path="couch.d.ts" />

let music: HTMLAudioElement | null = null

function initMusic() {
    const synth = new sonant
    for (let i = 0; i < 8; ++i) {
        synth.generate(i)
    }
    music = synth.createAudio()
    music.loop = true
}

function playMusic() {
    if (music) music.play()
}

function pauseMusic() {
    if (music) music.pause()
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
    container.removeChild(loadingScreen)
}

handleResize()

initMainMenu()
init()
initBackground()

requestAnimationFrame(mainloop)
paintBackground()
