'use strict'

module.exports = Observer

function Observer (event, end, disposable) {
  this._event = event
  this._end = end
  this._disposable = disposable
  this.active = true
}

Observer.prototype.event = function (value) {
  if (!this.active) return
  this._event(value)
}

Observer.prototype.end = function (value) {
  if (!this.active) return
  this.active = false
  var end = this.end
  Promise.resolve(this._disposable.dispose())
    .then(function () {
      end(value)
    })
}
