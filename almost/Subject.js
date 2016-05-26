'use strict'

var SubjectSource = require('./source/Subject/SubjectSource').SubjectSource
var HoldSubjectSource = require('./source/Subject/HoldSubjectSource').HoldSubjectSource

exports.subject = function () {
  return new Subject(new SubjectSource())
}

exports.holdSubject = function (bufferSize) {
  return new Subject(new HoldSubjectSource(bufferSize))
}

exports.next = function (value, subject) {
  subject.next(value)
  return subject
}

exports.complete = function (value, subject) {
  subject.complete(value)
  return subject
}

exports.Subject = Subject

function Subject (source) {
  this.source = source
}

Subject.prototype.next = function (value) {
  this.source.next(value)
}

Subject.prototype.complete = function (value) {
  this.source.complete(value)
}
