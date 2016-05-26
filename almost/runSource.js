'use strict'

var Observer = require('./sink/Observer')
var dispose = require('./disposable/dispose')

exports.runSource = runSource
exports.runWithPromise = runWithPromise

function runWithPromise (event, source) {
  return new Promise(function (resolve) {
    runSource(event, resolve, source)
  })
}

function runSource (event, end, source) {
  var disposable = dispose.settable()
  disposable.setDisposable(source.run(new Observer(event, end, disposable)))
}
