function classNamesLow (...pars: object[]) {
  var classes = []

  for (let i = 0; i < pars.length; i++) {
    var arg = pars[i]
    if (!arg) continue

    var argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg) && arg.length) {
      var inner = classNamesLow(...arg)
      if (inner) classes = classes.concat(inner)
    } else if (argType === 'object') {
      for (const key in arg) {
        if (arg[key]) classes.push(key)
      }
    }
  }

  return classes
}

const classNames = (...pars: object[]) => classNamesLow(pars).join(' ')

export default classNames