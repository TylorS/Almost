'use strict'

var MulticastSource = require('./source/MulticastSource').MulticastSource

module.exports = Stream

function Stream (source) {
  this.source = new MulticastSource(source)
}
