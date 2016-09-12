/// <reference path="couch.d.ts" />
var Body = (function () {
    function Body(mass) {
        if (mass === void 0) { mass = 1; }
        this.vertices = [];
        this.positions = [];
        this.constraints = [];
        this.boundaries = [];
        this.center = new Vec2;
        this.halfExtents = new Vec2;
        this.mass = mass;
    }
    Body.prototype.boundingBox = function () {
        var xmin = 99999;
        var ymin = 99999;
        var xmax = -99999;
        var ymax = -99999;
        for (var _i = 0, _a = this.positions; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.x < xmin)
                xmin = p.x;
            if (p.y < ymin)
                ymin = p.y;
            if (p.x > xmax)
                xmax = p.x;
            if (p.y > ymax)
                ymax = p.y;
        }
        this.center.set((xmin + xmax) * 0.5, (ymin + ymax) * 0.5);
        this.halfExtents.set((xmax - xmin) * 0.5, (ymax - ymin) * 0.5);
    };
    Body.prototype.project = function (a) {
        this._min = 99999;
        this._max = -99999;
        for (var _i = 0, _a = this.positions; _i < _a.length; _i++) {
            var p = _a[_i];
            var product = p.dot(a);
            if (product < this._min)
                this._min = product;
            if (product > this._max)
                this._max = product;
        }
    };
    Body.prototype.draw = function (context) {
        context.beginPath();
        var p0 = this.boundaries[0].p0;
        context.moveTo(p0.x, p0.y);
        for (var _i = 0, _a = this.boundaries; _i < _a.length; _i++) {
            var p1 = _a[_i].p1;
            context.lineTo(p1.x, p1.y);
        }
        context.fillStyle = '#AEEA00';
        context.fill();
        this.drag();
        context.fillStyle = '#FF1744';
        context.fillRect(this.center.x - 1, this.center.y - 1, 2, 2);
    };
    Body.prototype.drag = function () {
        if (pointer.dragging && !draggingPoint &&
            context.isPointInPath(pointer.x, pointer.y)) {
            var minDistance = 99999;
            for (var _i = 0, _a = this.vertices; _i < _a.length; _i++) {
                var p = _a[_i];
                var distance = p.position.distance(pointer);
                if (distance < minDistance) {
                    minDistance = distance;
                    draggingPoint = p;
                }
            }
        }
    };
    return Body;
}());
