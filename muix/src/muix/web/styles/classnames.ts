import * as Sheeter from 'reactxx-sheeter';

function classNamesLow(...pars: object[]) {
  var classes = []

  for (let i = 0; i < pars.length; i++) {
    var arg = pars[i]
    if (!arg) continue

    if (arg['#rulesetName']) arg = arg['#rulesetName']

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

// class Test {
//   id = 10
//   name = 'xxx'
//   toString() {
//     return 'TestXXX 1'
//   }
// }

// const test = new Test()
// const test2 = {
//   id: 10,
//   name: 'xxx',
//   toString: () => {
//     return 'TestXXX 2'
//   }
// }

// debugger
// const x = {
//   [test as any]: 'test1',
//   [test2 as any]: 'test2'
// }

// alert(JSON.stringify(x, null, 2))

const classNames = (...pars: any[]) => {
  let classes, getClassesPatches
  pars.forEach(rule => {
    if (!classes) {
      classes = rule['#classes']
      getClassesPatches = rule['#getClassesPatches']
    }
  })
  if (!classes) return null
  const used = []
  const usedNames = classNamesLow(pars)
  usedNames.forEach((name:string) => {
    if (name==='toString' || name.charAt(0)==='#'|| name.charAt(0)==='$') return
    const cls = classes[name]
    if (!cls) return
    used.push(cls)
  })
  const  merged = {...Sheeter.mergeRulesetsForCode(classes, getClassesPatches, used)}
  delete merged['#classes']
  delete merged['toString']
  delete merged['#getClassesPatches']
  return null
}

export default classNames