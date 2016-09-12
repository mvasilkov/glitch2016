/// <reference path="couch.d.ts" />
var pointer = {
    dragging: false,
    x: 0,
    y: 0,
};
function setPointerPosition(event) {
    pointer.x = (event.clientX - container.offsetLeft) * cscale;
    pointer.y = (event.clientY - container.offsetTop) * cscale;
}
addEventListener('mousedown', function (event) {
    event.preventDefault();
    pointer.dragging = true;
    setPointerPosition(event);
});
addEventListener('mousemove', function (event) {
    event.preventDefault();
    setPointerPosition(event);
});
addEventListener('mouseup', function (event) {
    event.preventDefault();
    pointer.dragging = false;
    draggingPoint = null;
});
document.addEventListener('touchstart', function (event) {
    event.preventDefault();
    pointer.dragging = true;
    setPointerPosition(event.targetTouches[0]);
});
document.addEventListener('touchmove', function (event) {
    event.preventDefault();
    setPointerPosition(event.targetTouches[0]);
});
document.addEventListener('touchend', function (event) {
    event.preventDefault();
    pointer.dragging = false;
    draggingPoint = null;
});
document.addEventListener('touchcancel', function (event) {
    event.preventDefault();
    pointer.dragging = false;
    draggingPoint = null;
});
