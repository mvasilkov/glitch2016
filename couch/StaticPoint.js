/// <reference path="couch.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StaticPoint = (function (_super) {
    __extends(StaticPoint, _super);
    function StaticPoint(parent, x, y) {
        _super.call(this, parent, x, y);
        this.x = x;
        this.y = y;
    }
    StaticPoint.prototype.integrate = function () {
        this.position.set(this.x, this.y);
        this.oldPosition.set(this.x, this.y);
    };
    return StaticPoint;
}(Point));
