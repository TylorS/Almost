'use strict'

// module Almost

var fn = require('../almost/util/function')
var curry2 = fn.curry2

// Subjects :'(
var subjects = require('../almost/Subject')

exports.subject = subjects.subject
exports.holdSubject = subjects.holdSubject

// Subject methods
exports.next = curry2(subjects.next)
exports.complete = curry2(subjects.complete)

/* Regular Stream stuffz */

// Sources
var core = require('../almost/source/core')

exports.just = core.just
exports.empty = core.empty
exports.never = core.never

exports.periodic = curry2(require('../almost/source/periodic').periodic)

// Combinators
var observe = require('../almost/combinator/observe')
exports.observe = curry2(observe.observe)
exports.drain = observe.drain

// needed for promieses
exports.thenp = curry2(function (fn, promise) {
  return promise.then(fn)
})

var transform = require('../almost/combinator/transform')

exports.map = curry2(transform.map)
exports.tap = curry2(transform.tap)

exports.filter = curry2(require('../almost/combinator/filter').filter)
