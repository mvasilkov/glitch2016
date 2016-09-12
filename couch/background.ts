/// <reference path="couch.d.ts" />

let backCushion: Cushion | null = null

function initBackground() {
    backCushion = new Cushion(255, 360, 450, 180, false)
}

function paintBackground() {
    backCushion!.draw(backcontext, '#0091EA')

    backcontext.save()

    backcontext.shadowColor = '#000'
    backcontext.shadowBlur = 25

    backcontext.translate(0, 1)

    couch!.draw(backcontext, 'rgba(55,71,79,0.4)')
    armrest0!.draw(backcontext, 'rgba(55,71,79,0.4)')
    armrest1!.draw(backcontext, 'rgba(55,71,79,0.4)')

    backcontext.restore()
}
