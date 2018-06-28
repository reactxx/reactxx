import React from 'react'
import ReactN from 'react-native'
import warning from 'warning'

import { deepMerges, deepMerge } from './to-platform'

type TSheetNode = {
  [propName: string]: TSheetNode
}
const linearProps = ['$before', '$self', '$web', '$native', '$after']

// process $before, $web, $native and $after props. !!! function mutate root !!!
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
      value = linearize(value)
    }
    // use value
    if (!single) single = value // first
    else if (!array) array = [value] //second
    else array.push(value) // third and more
  })
  for (const pp in self) {
    const value = self[pp]
    if (isObject(value)) self[pp] = linearize(value)
  }
  return array ? deepMerges(single, ...array) : single
}

export const isObject = item => item && typeof item === 'object' && !Array.isArray(item)

const addInsPropName = 'add-ins'

const toPatchAble = (act: TSheetNode, root: TSheetNode, actPath: string) => {
  for (const p in act) {
    let value = act[p]
    if (p.charAt(0) === '$') {
      delete act[p]
      const addIns = root['add-ins'] || (root['add-ins'] = {})
      const addIn = addIns[p] || (addIns[p] = {})
      const path = `add-ins/${p}/${actPath}`
      const oldValue = addIn[actPath], newValue = toPatchAble(value, root, path)
      addIn[actPath] = oldValue ? deepMerge(oldValue, newValue) : newValue
    } else if (isObject(value))
      act[p] = toPatchAble(value, root, actPath ? `${actPath}/${p}` : p)
  }
  return act
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

const linear = linearize(root)

export const test = () => toPatchAble(linear, linear, null)