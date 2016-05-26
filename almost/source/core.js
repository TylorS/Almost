'use strict'

var Stream = require('../Stream')
var disposable = require('../disposable/dispose')

exports.just = just
exports.empty = empty
exports.never = never

function just (value) {
  return new Stream(new ValueSource(value))
}

function ValueSource (value) {
  this.value = value
}

ValueSource.prototype.run = function (sink) {
  Promise.resolve(this).then(function (valueSource) {
    var value = valueSource.value
    sink.event(value)
    sink.end(value)
  })
}

var EMPTY = new Stream({
  run: function (sink) {
    Promise.resolve(this).then(function () {
      sink.end(void 0)
    })

    return disposable.empty()
  }
})

function empty () {
  return EMPTY
}

var NEVER = new Stream({
  run: function (sink) {
    return disposable.empty()
  }
})

function never () {
  return NEVER
}
