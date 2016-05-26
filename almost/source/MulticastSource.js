'use strict'

var arr = require('../../util/array')
var append = arr.append
var remove = arr.remove
var findIndex = arr.findIndex

var MulticastDisposable =
  require('../disposable/MulticastDisposable').MulticastDisposable

exports.MulticastSource = MulticastSource

var NONE = {}

var emptyDisposable = {
  dispose: function () {}
}

function MulticastSource (source) {
  this.source = source
  this.sinks = []
  this._disposable = emptyDisposable
  this.stopId = NONE
}

MulticastSource.prototype.run = function (sink) { // eslint-disable-line complexity
  var n = this.add(sink)
  if (n === 1) {
    if (this.stopId !== NONE) {
      clearTimeout(this.stopId)
      this.stopId = NONE
    }
    if (this.source) this._disposable = this.source.run(this)
  }
  return new MulticastDisposable(this, sink)
}

MulticastSource.prototype._dispose = function () {
  var disposable = this._disposable
  this.stopId = setTimeout(function () {
    disposable.dispose()
  })
}

MulticastSource.prototype.add = function (sink) {
  this.sinks = append(sink, this.sinks)
  return this.sinks.length
}

MulticastSource.prototype.remove = function (sink) {
  var index = findIndex(sink, this.sinks)

  if (index >= 0) this.sinks = remove(index, this.sinks)

  return this.sinks.length
}

MulticastSource.prototype.event = function (value) {
  var s = this.sinks
  if (s.length === 1) { s[0].event(value) }

  for (var i = 0; i < s.length; ++i) {
    s[i].event(value)
  }
}

MulticastSource.prototype.end = function (value) {
  var s = this.sinks
  if (s.length === 1) { s[0].end(value) }

  for (var i = 0; i < s.length; ++i) {
    s[i].end(value)
  }
}
