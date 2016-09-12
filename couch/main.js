/// <reference path="couch.d.ts" />
var kGravity = 0.6;
var kAttractiveForce = 0.1;
var kNumIterations = 40;
var kFriction = 0.9;
var kFrictionGround = 0.6;
var kViscosity = 1;
var kForceDrag = 0.24;
var bodies = [];
var vertices = [];
var constraints = [];
var draggingPoint = null;
var register0 = new Vec2;
var register1 = new Vec2;
var count = {};
var numberOfCushions = 3;
var stats;
function mainloop() {
    stats.begin();
    context.clearRect(0, 0, cwidth, cheight);
    for (var _i = 0, vertices_1 = vertices; _i < vertices_1.length; _i++) {
        var p = vertices_1[_i];
        p.integrate();
    }
    var addPieces = false;
    var _loop_1 = function(i) {
        var b = bodies[i];
        //if (!(b instanceof Piece)) continue
        if (b.center.y >= cheight + b.r) {
            constraints = constraints.filter(function (c) { return c.parent != b; });
            vertices = vertices.filter(function (p) { return p.parent != b; });
            if (draggingPoint && draggingPoint.parent == b) {
                draggingPoint = null;
                pointer.dragging = false;
            }
            bodies.splice(i, 1);
            --count[b.n];
            aa.play('die');
            addPieces = true;
            --i;
        }
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = numberOfCushions; i < bodies.length; ++i) {
        _loop_1(i);
        i = out_i_1;
    }
    var _loop_2 = function(i) {
        var b = bodies[i];
        //if (!(b instanceof Piece)) continue
        var attractDistance = 2.5 * b.r;
        var minDistance = 99999;
        var other = null;
        var index = 0;
        for (var j = i + 1; j < bodies.length; ++j) {
            var bb = bodies[j];
            //if (!(bb instanceof Piece)) continue
            if (b.n != bb.n)
                continue;
            var distance = b.center.distance(bb.center);
            if (distance < attractDistance && distance < minDistance) {
                minDistance = distance;
                other = bb;
                index = j;
            }
        }
        if (!other)
            return "continue";
        var x = 0.5 * (b.center.x + other.center.x);
        var y = 0.5 * (b.center.y + other.center.y);
        if (minDistance > 2 * b.r) {
            for (var _a = 0, _b = b.positions; _a < _b.length; _a++) {
                var p = _b[_a];
                p.x += (x - p.x) * kAttractiveForce;
                p.y += (y - p.y) * kAttractiveForce;
            }
            for (var _c = 0, _d = other.positions; _c < _d.length; _c++) {
                var p = _d[_c];
                p.x += (x - p.x) * kAttractiveForce;
                p.y += (y - p.y) * kAttractiveForce;
            }
        }
        else {
            constraints = constraints.filter(function (c) { return c.parent != b && c.parent != other; });
            vertices = vertices.filter(function (p) { return p.parent != b && p.parent != other; });
            if (draggingPoint && (draggingPoint.parent == b || draggingPoint.parent == other)) {
                draggingPoint = null;
                pointer.dragging = false;
            }
            bodies.splice(index, 1);
            bodies[i] = new Piece(x, y, b.n << 1, false);
            count[b.n] -= 2;
            aa.play('bip');
            addPieces = true;
            if (b.n == 1024) {
                gameover();
            }
        }
    };
    for (var i = numberOfCushions; i < bodies.length - 1; ++i) {
        _loop_2(i);
    }
    if (addPieces) {
        addPiecesRateLimit();
    }
    if (draggingPoint) {
        draggingPoint.position.x += (pointer.x - draggingPoint.position.x) * kForceDrag;
        draggingPoint.position.y += (pointer.y - draggingPoint.position.y) * kForceDrag;
    }
    for (var n = 0; n < kNumIterations; ++n) {
        for (var _e = 0, constraints_1 = constraints; _e < constraints_1.length; _e++) {
            var c = constraints_1[_e];
            c.solve();
        }
        for (var _f = 0, bodies_1 = bodies; _f < bodies_1.length; _f++) {
            var b = bodies_1[_f];
            b.boundingBox();
        }
        for (var i = 0; i < bodies.length - 1; ++i) {
            for (var j = i + 1; j < bodies.length; ++j) {
                if (sat(bodies[i], bodies[j])) {
                    resolve();
                }
            }
        }
    }
    for (var _g = 0, bodies_2 = bodies; _g < bodies_2.length; _g++) {
        var b = bodies_2[_g];
        b.draw(context);
    }
    if (draggingPoint) {
        context.beginPath();
        context.moveTo(draggingPoint.position.x, draggingPoint.position.y);
        context.lineTo(pointer.x, pointer.y);
        context.strokeStyle = '#FFD600';
        context.stroke();
    }
    stats.end();
    requestAnimationFrame(mainloop);
}
function spawnLocation() {
    return (Math.random() * 0.3 + 0.35) * cwidth;
}
var addPiecesRateLimit = debounce(function () {
    var has256 = count[256] || count[512] || count[1024];
    if (count[2]) {
        new Piece(spawnLocation());
    }
    else if (count[4]) {
        new Piece(spawnLocation(), -44, 4);
    }
    else if (has256) {
        if (count[8]) {
            new Piece(spawnLocation(), -48, 8);
        }
        else {
            new Piece(0.35 * cwidth, -44, 4);
            new Piece(0.65 * cwidth, -44, 4);
        }
    }
    else {
        new Piece(0.35 * cwidth);
        new Piece(0.65 * cwidth);
    }
    aa.play('new');
}, 300);
var couch = null;
var armrest0 = null;
var armrest1 = null;
function init() {
    for (var n = 2; n <= 2048; n *= 2) {
        count[n] = 0;
    }
    couch = new Cushion(280, 480, 400, 60);
    armrest0 = new Cushion(220, 420, 60, 120);
    armrest1 = new Cushion(680, 420, 60, 120);
    new Constraint(couch, couch.handle0, armrest0.handle0, 0.1);
    new Constraint(couch, couch.handle1, armrest1.handle1, 0.1);
    var y = cheight * 0.5;
    new Piece(0.35 * cwidth, y);
    new Piece(0.65 * cwidth, y);
    if (stats == null) {
        stats = new Stats;
        document.body.appendChild(stats.dom);
    }
}
