/// <reference path="couch.d.ts" />
var Vec2 = (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vec2.prototype.setTo = function (other) {
        this.x = other.x;
        this.y = other.y;
    };
    Vec2.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vec2.prototype.distance = function (other) {
        var x = this.x - other.x;
        var y = this.y - other.y;
        return Math.sqrt(x * x + y * y);
    };
    Vec2.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
    };
    Vec2.prototype.subtract = function (other) {
        this.x -= other.x;
        this.y -= other.y;
    };
    Vec2.prototype.setSubtract = function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
    };
    Vec2.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vec2.prototype.multiplyScalar = function (a) {
        this.x *= a;
        this.y *= a;
    };
    Vec2.prototype.setMultiplyScalar = function (other, a) {
        this.x = other.x * a;
        this.y = other.y * a;
    };
    Vec2.prototype.setNormal = function (a, b) {
        // perpendicular
        var x = a.y - b.y;
        var y = b.x - a.x;
        // normalize
        var length = Math.sqrt(x * x + y * y);
        if (length < Number.MIN_VALUE) {
            this.x = x;
            this.y = y;
            return;
        }
        var inverseLength = 1 / length;
        this.x = x * inverseLength;
        this.y = y * inverseLength;
    };
    return Vec2;
}());
