/// <reference path="couch.d.ts" />
var _a = (function () {
    var satDistance;
    var satAxis = new Vec2;
    var satBoundary;
    var satPoint;
    // Separating Axis Theorem collision test
    function sat(b0, b1) {
        // aabb overlap test
        if (Math.abs(b1.center.x - b0.center.x) - (b0.halfExtents.x + b1.halfExtents.x) >= 0 ||
            Math.abs(b1.center.y - b0.center.y) - (b0.halfExtents.y + b1.halfExtents.y) >= 0)
            return false;
        satDistance = 99999;
        for (var _i = 0, _a = [b0, b1]; _i < _a.length; _i++) {
            var b = _a[_i];
            for (var _b = 0, _c = b.boundaries; _b < _c.length; _b++) {
                var boundary = _c[_b];
                register0.setNormal(boundary.p0, boundary.p1);
                b0.project(register0);
                b1.project(register0);
                var distance = (b0._min < b1._min) ? b1._min - b0._max : b0._min - b1._max;
                if (distance > 0)
                    return false;
                distance *= -1; // == Math.abs(distance)
                if (distance < satDistance) {
                    satDistance = distance;
                    satAxis.setTo(register0);
                    satBoundary = boundary;
                }
            }
        }
        if (satBoundary.parent != b1) {
            _d = [b1, b0], b0 = _d[0], b1 = _d[1];
        }
        register0.setSubtract(b0.center, b1.center);
        if (register0.dot(satAxis) < 0) {
            satAxis.multiplyScalar(-1);
        }
        var minDistance = 99999;
        for (var _e = 0, _f = b0.vertices; _e < _f.length; _e++) {
            var p = _f[_e];
            register0.setSubtract(p.position, b1.center);
            var distance = satAxis.dot(register0);
            if (distance < minDistance) {
                minDistance = distance;
                satPoint = p;
            }
        }
        return true;
        var _d;
    }
    // collision resolution
    function resolve() {
        var p0 = satBoundary.p0;
        var p1 = satBoundary.p1;
        var o0 = satBoundary.v0.oldPosition;
        var o1 = satBoundary.v1.oldPosition;
        var pp = satPoint.position;
        var po = satPoint.oldPosition;
        register0.setMultiplyScalar(satAxis, satDistance);
        var t = (Math.abs(p0.x - p1.x) > Math.abs(p0.y - p1.y)) ?
            (pp.x - register0.x - p0.x) / (p1.x - p0.x) :
            (pp.y - register0.y - p0.y) / (p1.y - p0.y);
        var u = 1 / (t * t + (1 - t) * (1 - t));
        var m0 = satPoint.parent.mass;
        var m1 = satBoundary.parent.mass;
        var tm = m0 + m1;
        m0 /= tm * 2;
        m1 /= tm;
        p0.x -= register0.x * (1 - t) * u * m0;
        p0.y -= register0.y * (1 - t) * u * m0;
        p1.x -= register0.x * t * u * m0;
        p1.y -= register0.y * t * u * m0;
        pp.x += register0.x * m1;
        pp.y += register0.y * m1;
        if (kFriction) {
            register0.set(pp.x - po.x - (p0.x + p1.x - o0.x - o1.x) * 0.5, pp.y - po.y - (p0.y + p1.y - o0.y - o1.y) * 0.5);
            register1.set(-satAxis.y, satAxis.x);
            register0.setMultiplyScalar(register1, register0.dot(register1));
            o0.x -= register0.x * (1 - t) * kFriction * u * m0;
            o0.y -= register0.y * (1 - t) * kFriction * u * m0;
            o1.x -= register0.x * t * kFriction * u * m0;
            o1.y -= register0.y * t * kFriction * u * m0;
            po.x += register0.x * kFriction * m1;
            po.y += register0.y * kFriction * m1;
        }
    }
    return [sat, resolve];
}()), sat = _a[0], resolve = _a[1];
