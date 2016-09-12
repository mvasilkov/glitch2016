/// <reference path="couch.d.ts" />
var Point = (function () {
    function Point(parent, x, y) {
        this.parent = parent;
        this.position = new Vec2(x, y);
        this.oldPosition = new Vec2(x, y);
        parent.vertices.push(this);
        parent.positions.push(this.position);
        vertices.push(this);
    }
    Point.prototype.integrate = function () {
        var p = this.position;
        var o = this.oldPosition;
        var x = p.x;
        var y = p.y;
        p.x += (kViscosity * p.x - kViscosity * o.x);
        p.y += (kViscosity * p.y - kViscosity * o.y) + kGravity;
        o.set(x, y);
        // screen limits
        if (p.y < -100)
            p.y = -100;
        else if (p.y >= canvas.height + 250) {
            p.x -= (p.x - o.x) * kFrictionGround;
            p.y = canvas.height - 1;
        }
        if (p.x < 0)
            p.x = 0;
        else if (p.x >= canvas.width)
            p.x = canvas.width - 1;
    };
    return Point;
}());
