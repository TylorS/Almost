'use strict'

var Stream = require('../Stream')

exports.filter = filter

function filter (fn, stream) {
  return new Stream(new FilterSource(fn, stream.source))
}

function FilterSource (fn, source) {
  this.fn = fn
  this.source = source
}

FilterSource.prototype.run = function (sink) {
  return this.source.run(new FilterSink(sink, this.fn))
}

function FilterSink (sink, fn) {
  this.sink = sink
  this.fn = fn
}

FilterSink.prototype.event = function (value) {
  if (this.fn(value)) this.sink.event(value)
}

FilterSink.prototype.end = function (value) {
  this.sink.end(value)
}
