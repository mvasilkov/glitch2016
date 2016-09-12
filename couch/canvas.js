/// <reference path="couch.d.ts" />
var cwidth = 960;
var cheight = 540;
var aspect = 16 / 9;
var cscale = 1;
var container = document.getElementById('container');
var backcanvas = document.getElementById('backcanvas');
var canvas = document.getElementById('canvas');
var backcontext = backcanvas.getContext('2d');
var context = canvas.getContext('2d');
var transformProperty = 'transform';
if (!(transformProperty in container.style)) {
    transformProperty = 'webkitTransform';
}
backcanvas.width = canvas.width = cwidth;
backcanvas.height = canvas.height = cheight;
context.lineWidth = 2;
context.textAlign = 'center';
context.textBaseline = 'middle';
function setSize(x, property, value) {
    x.style[property] = value + "px";
}
function handleResize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w / h > aspect)
        w = h * aspect;
    else
        h = w / aspect;
    cscale = cwidth / w;
    setSize(container, 'width', w);
    setSize(container, 'height', h);
    setSize(container, 'left', 0.5 * (window.innerWidth - w));
    setSize(container, 'top', 0.5 * (window.innerHeight - h));
    var scale = 0.5 * w / cwidth;
    var scale3d = "scale3d(" + scale + "," + scale + ",1)";
    startScreen.style[transformProperty] = scale3d;
    endScreen.style[transformProperty] = scale3d;
}
//handleResize()
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
canvas.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});
