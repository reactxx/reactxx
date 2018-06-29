import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

// transform sheet to mergable and patchable form. !!! root is mutated !!!
export const toPatchable = (root: {}) => {
  root = linearize(root)
  return extractPatches(root, root, '')
}

//****************************
// PRIVATE
//****************************

type TSheetNode = {
  [propName: string]: TSheetNode
}
const linearProps = ['$before', '$self', '$web', '$native', '$after']

// process $before, $web, $native and $after props. !!! root is mutated !!!
const linearize = (root: TSheetNode) => {
  let single: TSheetNode = null, array: TSheetNode[] = null, self: TSheetNode = null
  linearProps.forEach((p, idx) => {
    // ignore wrong platform 
    if (window.isWeb && p === '$native' || !window.isWeb && p === '$web') { delete root[p]; return }
    // get value
    let value
    if (p === '$self')
      self = value = root
    else {
      value = root[p]; if (!value) return; delete root[p];
      warning(typeof value === 'object', 'Object expected for $before, $web, $native or $after props')
      value = linearize(value)
    }
    // use value
    if (!single) single = value // first
    else if (!array) array = [value] //second
    else array.push(value) // third and more
  })
  for (const pp in self) {
    const value = self[pp]
    if (typeof value === 'object') self[pp] = linearize(value)
  }
  return array ? deepMerges(single, array) : single
}

const addInsPropName = 'add-ins'

const extractPatches = (act: TSheetNode, root?: TSheetNode, actPath?: string) => {
  for (const p in act) {
    const value = act[p]
    if (typeof value !== 'object') continue
    if (p.charAt(0) === '$') {
      delete act[p]
      const addIns = root['add-ins'] || (root['add-ins'] = {})
      const addIn = addIns[p] || (addIns[p] = {})
      const path = `add-ins/${p}/${actPath}`
      const oldValue = addIn[actPath], newValue = extractPatches(value, root, path)
      addIn[actPath] = oldValue ? deepMerge(oldValue, newValue) : newValue
    } else
      act[p] = extractPatches(value, root, actPath ? `${actPath}/${p}` : p)
  }
  return act
}

const deepMerges = (target, sources: {}[]) => {
  if (!sources || sources.length===0) return target
  sources.forEach(source => deepMerge(target, source))
  return target
}

//simple deep merge
const deepMerge = (target, source) => {
  if (!source) return target
  for (const key in source) {
    const sourcep = source[key], targetp = target[key]
    if (!targetp) { target[key] = sourcep; continue }
    const sourceObj = typeof sourcep === 'object', targetObj = typeof targetp === 'object'
    warning(sourceObj === targetObj, 'deepMerge: cannot merge object and non object')
    target[key] = sourceObj ? deepMerge(targetp, sourcep) : sourcep
  }
  return target
}

const root: any = {
  root: {
    $web: {
      $mediaq: {
        '480-640': {
          $whenUsed: {
            b: {
              $web: {
                ":hover": {
                  color: 'yellow'
                },
              },
            },
          },
        },
      },
      backgroundColor: 'blue',
    },
    $whenUsed: {
      a: {
        $mediaq: {
          '320-640': {
            color: 'green',
          },
        },
      },
    },
    color: 'red',
    $mediaq: {
      '640-1024': {
        ':hover': {
          $whenUsed: {
            $web: {
              color: 'red',
            }
          },
        },
      },
    },
  }
}

debugger

window['isWeb'] = true

export const test = () => {
  const res = toPatchable(root)
  return res
}