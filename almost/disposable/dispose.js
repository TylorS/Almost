'use strict'

var Disposable = require('./Disposable').Disposable
var SettableDisposable = require('./SettableDisposable').SettableDisposable
var map = require('../util/array').map

exports.create = create
exports.once = once
exports.empty = empty
exports.all = all
exports.promised = promised
exports.settable = settable

function settable () {
  return new SettableDisposable()
}

function create (dispose, data) {
  return once(new Disposable(dispose, data))
}

function empty () {
  return new Disposable(function (x) { return x }, void 0)
}

function all (disposables) {
  return create(disposeAll, disposables)
}

function disposeAll (disposables) {
  return Promise.all(map(disposeOne, disposables))
}

function promised (disposablePromise) {
  return create(disposePromise, disposablePromise)
}

function disposePromise (disposablePromise) {
  return disposablePromise.then(disposeOne)
}

function disposeOne (disposable) {
  return disposable.dispose()
}

function once (disposable) {
  return new Disposable(disposeMemoized, memoized(disposable))
}

function disposeMemoized (memoized) {
  if (!memoized.disposed) {
    memoized.disposed = true
    memoized.value = disposeOne(memoized.disposable)
    memoized.disposable = void 0
  }

  return memoized.value
}

function memoized (disposable) {
  return { disposed: false, disposable: disposable, value: void 0 }
}
