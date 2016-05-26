exports.curry2 = curry2
exports.curry3 = curry3

function curry2 (f) {
  function curried (a, b) {
    switch (arguments.length) {
      case 0: return curried
      case 1: return function (b) { return f(a, b) }
      default: return f(a, b)
    }
  }
  return curried
}

function curry3 (f) {
  function curried (a, b, c) { // eslint-disable-line complexity
    switch (arguments.length) {
      case 0: return curried
      case 1: return curry2(function (b, c) { return f(a, b, c) })
      case 2: return function (c) { return f(a, b, c) }
      default:return f(a, b, c)
    }
  }
  return curried
}
