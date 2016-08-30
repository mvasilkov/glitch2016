/// <reference path="couch.d.ts" />

const kGravity = 0.1
const kNumIterations = 20
const kFriction = 0.9
const kFrictionGround = 0.6
const kViscosity = 1
const kForceDrag = 20

const bodies = [] as Body[]
const vertices = [] as Point[]
const constraints = [] as Constraint[]

const register0 = new Vec2
const register1 = new Vec2

const canvas = <HTMLCanvasElement>document.getElementById('canvas')
