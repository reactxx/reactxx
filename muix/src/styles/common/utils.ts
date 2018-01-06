export function deepMerge(target, ...sources) {
  if (!sources.length) return target

  const source = sources.shift()
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) target[key] = {}
        deepMerge(target[key], source[key])
      } else 
        target[key] = source[key]
    }
  } else
    throw 'Cannot merge object and non object props'

  return deepMerge(target, ...sources);
}

const isObject = item => item && typeof item === 'object' && !Array.isArray(item)
