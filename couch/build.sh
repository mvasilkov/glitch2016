#!/bin/bash

tsc --strictNullChecks --target ES5 *.ts

uglifyjs --enclose --compress --mangle --lint --output build/couch.js -- \
    AAudio.js Body.js Constraint.js Cushion.js Piece.js Point.js StaticPoint.js \
    Vec2.js background.js canvas.js collision.js debounce.js game.js main.js \
    music/sonant.js music/song.js pointer.js polyfill.js run.js

cleancss --output build/couch.css -- couch.css

html-minifier --collapse-whitespace --remove-attribute-quotes \
    --output build/index.html -- index_build.html

uglifyjs --expr --output build/manifest.json -- manifest.json
