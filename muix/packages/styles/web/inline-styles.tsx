//DEPRECATED, USED fela.js INSTEAD

import React from 'react'
//import JssProvider from 'react-jss/lib/JssProvider'
//import { create } from 'jss';
//import preset from 'jss-preset-default';
import { jss } from './withStyles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

//const jss = create(preset())
//jss.options.createGenerateClassName = createGenerateClassName
//jss.options.insertionPoint = 'insertion-point-jss'


//export const Styles: React.SFC<{}> = props => <JssProvider jss={jss}>{props.children}</JssProvider>

//const felaSheet = jss.createStyleSheet({}, { index: 999999, meta: 'fela-like' }).attach()

let felaSheet = null
const createFelaSheet = () => felaSheet || (felaSheet = jss.createStyleSheet({}, { index: 999999, meta: 'atomic-classes' }).attach())

//debugger
//const rule = jss.createRule('aaa', { display: 'flex', padding: 10 })
//felaSheet.insertRule(rule)
//const json = rule.toJSON()

let counter = 0
const cache = {}

export const rulesetToClassNames = (css: React.CSSProperties) => {
  if (!css) return ''
  const classes: string[] = []
  for (var p in css) {
    let key = p + '|' + css[p].toString()
    let cls = cache[key]
    if (!cls) {
      const id = `f${counter++}`
      cls = createFelaSheet().addRule(id, { [p]: css[p] }).selector.substr(1)
      cache[key] = cls
    }
    classes.push(cls)
  }
  return classes.join(' ')
}

//export const ruleToClassNamesOld = (css: React.CSSProperties) => {
//  if (!css) return ''
//  const classes: string[] = []
//  for (var p in css) {
//    let key = p + '|' + css[p]
//    let cls = cache[key]
//    if (!cls) {
//      const id = `f${counter++}`
//      const rule = jss.createRule(id, { [p]: css[p] }) //could replace padding:10 to padding:10px
//      const st = rule.style
//      for (var pp in st) {
//        key = pp + '|' + st[pp]
//        cls = cache[key]
//        if (!cls) {
//          cls = rule.selector.substr(1)
//          cache[key] = cls
//          createFelaSheet().insertRule(rule)
//        }
//        break
//      }
//    }
//    classes.push(cls)
//  }
//  return classes.join(' ')
//}

export const sheetToClassNames = <TKey extends string>(sheet: Partial<Record<TKey, React.CSSProperties>>) => {
  if (!sheet) return null
  const res: Partial<Record<TKey, string>> = {}
  for (const p in sheet) res[p] = rulesetToClassNames(sheet[p])
  return res
}

//let css = renderCSS({ padding: 10, margin: '10px', display: 'flex' })
//css = renderCSS({ padding: 10, margin: '12px' })
//css = null