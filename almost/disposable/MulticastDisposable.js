exports.MulticastDisposable = MulticastDisposable

function MulticastDisposable (source, sink) {
  this.source = source
  this.sink = sink
  this.disposed = false
}

MulticastDisposable.prototype.dispose = function () {
  if (this.disposed) return

  this.disposed = true
  var remaining = this.source.remove(this.sink)
  return remaining === 0 && this.source._dispose()
}
