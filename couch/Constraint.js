/// <reference path="couch.d.ts" />
var Constraint = (function () {
    function Constraint(parent, v0, v1, stiffness, isBoundary) {
        if (isBoundary === void 0) { isBoundary = false; }
        this.parent = parent;
        this.v0 = v0;
        this.v1 = v1;
        this.p0 = v0.position;
        this.p1 = v1.position;
        this.length = this.p0.distance(this.p1);
        this.stiffness = stiffness;
        this.isBoundary = isBoundary;
        parent.constraints.push(this);
        if (isBoundary)
            parent.boundaries.push(this);
        constraints.push(this);
    }
    Constraint.prototype.solve = function () {
        register0.setSubtract(this.p0, this.p1);
        var length = register0.length();
        if (length) {
            register0.multiplyScalar(this.stiffness * (this.length - length) / length);
            this.p0.add(register0);
            this.p1.subtract(register0);
        }
    };
    return Constraint;
}());
