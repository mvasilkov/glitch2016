/// <reference path="couch.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cushion = (function (_super) {
    __extends(Cushion, _super);
    function Cushion(x, y, width, height, append) {
        if (append === void 0) { append = true; }
        _super.call(this, 250);
        var p0 = this.handle0 = new Point(this, x, y + Cushion.chamfer);
        var p1 = new Point(this, x + Cushion.chamfer, y);
        var p2 = new Point(this, x + width - Cushion.chamfer, y);
        var p3 = this.handle1 = new Point(this, x + width, y + Cushion.chamfer);
        var p4 = new StaticPoint(this, x + width, y + height);
        var p5 = new StaticPoint(this, x, y + height);
        new Constraint(this, p0, p1, 0.1, true);
        new Constraint(this, p1, p2, 0.1, true);
        new Constraint(this, p2, p3, 0.1, true);
        new Constraint(this, p3, p4, 0.1, true);
        new Constraint(this, p4, p5, 0.1, true);
        new Constraint(this, p5, p0, 0.1, true);
        new Constraint(this, p0, p3, 0.1);
        new Constraint(this, p0, p4, 0.1);
        new Constraint(this, p1, p4, 0.1);
        new Constraint(this, p1, p5, 0.1);
        new Constraint(this, p2, p4, 0.1);
        new Constraint(this, p2, p5, 0.1);
        new Constraint(this, p3, p5, 0.1);
        if (append) {
            bodies.push(this);
        }
    }
    Cushion.prototype.draw = function (context, color) {
        context.beginPath();
        var p0 = this.positions[0];
        var p1 = this.positions[1];
        context.moveTo(0.5 * (p0.x + p1.x), 0.5 * (p0.y + p1.y));
        for (var i = 1; i <= this.positions.length; ++i) {
            // bottom part
            if (i == 4 || i == 5) {
                context.lineTo(this.positions[i].x, this.positions[i].y);
                continue;
            }
            p0 = this.positions[i % this.positions.length];
            p1 = this.positions[(i + 1) % this.positions.length];
            context.quadraticCurveTo(p0.x, p0.y, 0.5 * (p0.x + p1.x), 0.5 * (p0.y + p1.y));
        }
        context.fillStyle = color || '#00B0FF';
        context.fill();
    };
    Cushion.chamfer = 10;
    return Cushion;
}(Body));
