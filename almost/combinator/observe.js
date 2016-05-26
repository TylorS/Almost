'use strict'

var runWithPromise = require('../runSource').runWithPromise

exports.drain = drain
exports.observe = observe

function drain (stream) {
  return observe(function (x) { return x }, stream)
}

function observe (fn, stream) {
  return runWithPromise(fn, stream.source)
}
