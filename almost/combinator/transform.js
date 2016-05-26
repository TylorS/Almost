'use strict'

var Stream = require('../Stream')

exports.map = map
exports.tap = tap

function tap (fn, stream) {
  return map(function (value) {
    fn(value)
    return value
  }, stream)
}

function map (fn, stream) {
  return new Stream(new MapSource(fn, stream.source))
}

function MapSource (fn, source) {
  this.fn = fn
  this.source = source
}

MapSource.prototype.run = function (sink) {
  return this.source.run(new MapSink(sink, this.fn))
}

function MapSink (sink, fn) {
  this.sink = sink
  this.fn = fn
}

MapSink.prototype.event = function (value) {
  this.sink.event(this.fn(value))
}

MapSink.prototype.end = function (value) {
  this.sink.end(this.fn(value))
}
