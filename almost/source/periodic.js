'use strict'

var Stream = require('../Stream')
var disposable = require('../disposable/dispose')

exports.periodic = periodic

function periodic (period, value) {
  return new Stream(new PeriodicSource(period, value))
}

function PeriodicSource (period, value) {
  this.period = period
  this.value = value
}

PeriodicSource.prototype.run = function (sink) {
  var value = this.value
  var interval = setInterval(function () { sink.event(value) }, this.period)

  return disposable.create(clearInterval, interval)
}
