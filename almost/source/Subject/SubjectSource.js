'use strict'

var disposable = require('../../disposable/dispose')
var MulticastSource = require('../MulticastSource').MulticastSource
var MulticastDisposable = require('../../disposable/MulticastDisposable').MulticastDisposable

exports.SubjectSource = SubjectSource

function SubjectSource () {
  this.source = emptySource
  this.sinks = []
  this.active = true
}

// Source methods
SubjectSource.prototype.run = MulticastSource.prototype.run

// Subject methods
SubjectSource.prototype.next = function (value) {
  if (!this.active) { return }
  this._next(value)
}

SubjectSource.prototype.error = function (err) {
  if (!this.active) { return }

  this.active = false
  this._error(err)
}

SubjectSource.prototype.complete = function (value) {
  if (!this.active) { return }

  this.active = false
  this._complete(this.scheduler.now(), value, this.sink)
}

// Multicasting methods
SubjectSource.prototype._dispose = MulticastDisposable.prototype._dispose
SubjectSource.prototype.add = MulticastSource.prototype.add
SubjectSource.prototype.remove = MulticastSource.prototype.remove
SubjectSource.prototype._next = MulticastSource.prototype.event
SubjectSource.prototype._complete = MulticastSource.prototype.end
SubjectSource.prototype._error = MulticastSource.prototype.error

var emptySource = {
  run: function (sink) {
    return disposable.empty()
  }
}
