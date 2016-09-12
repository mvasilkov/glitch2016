if (!Math.log2) {
    Math.log2 = function (x) {
        return Math.log(x) / Math.LN2
    }
}

if (!Math.log10) {
    Math.log10 = function (x) {
        return Math.log(x) / Math.LN10
    }
}

if (!Date.now) {
    Date.now = function () {
        return new Date().getTime()
    }
}

if (!Element.prototype.requestFullscreen) {
    Element.prototype.requestFullscreen =
        Element.prototype.mozRequestFullScreen ||
        Element.prototype.msRequestFullscreen ||
        Element.prototype.webkitRequestFullscreen
}
