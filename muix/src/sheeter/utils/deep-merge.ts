import warning from 'warning'

// !!! modify target !!!
export const deepMerges = (target, sources: Array<{}>) => {
    if (!sources || sources.length === 0) return target
    for (const source of sources) deepMerge(target, source)
    return target
  }
  
  //simple deep merge. !!! modify target !!!
  export const deepMerge = (target: {}, source: {}) => {
    if (!source) return target
    for (const key in source) {
      const sourcep = source[key], targetp = target[key], sourceObj = isObject(sourcep), targetObj = isObject(targetp)
      warning(!targetp || sourceObj === targetObj, 'deepMerge: cannot merge object and non object')
      target[key] = sourceObj ? deepMerge(targetp || {}, sourcep) : sourcep
    }
    return target
  }
  
//https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
export const isObject = obj => !!(obj && typeof obj === 'object' && !obj.$$typeof && Object.getPrototypeOf(obj) === Object.prototype)