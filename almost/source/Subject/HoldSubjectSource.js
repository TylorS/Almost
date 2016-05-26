'use strict'

var SubjectSource = require('./SubjectSource').SubjectSource
var arr = require('../../../util/array')
var append = arr.append
var drop = arr.drop

exports.HoldSubjectSource = HoldSubjectSource

function HoldSubjectSource (bufferSize) {
  SubjectSource.prototype.constructor.call(this)
  this.bufferSize = bufferSize
  this.buffer = []
}

HoldSubjectSource.prototype = SubjectSource.prototype
HoldSubjectSource.prototype.constructor = HoldSubjectSource

HoldSubjectSource.prototype._add = SubjectSource.prototype.add
HoldSubjectSource.prototype.add = function (sink) {
  var buffer = this.buffer
  if (buffer.length > 0) {
    pushEvents(buffer, sink)
  }
  return this._add(sink)
}

HoldSubjectSource.prototype.next = function (value) {
  if (!this.active) return
  this.buffer = dropAndAppend(value, this.buffer, this.bufferSize)
  this._next(value)
}

function pushEvents (buffer, sink) {
  for (var i = 0; i < buffer.length; ++i) {
    sink.event(buffer[i])
  }
}

function dropAndAppend (event, buffer, bufferSize) {
  if (buffer.length === bufferSize) {
    return append(event, drop(1, buffer))
  }
  return append(event, buffer)
}
