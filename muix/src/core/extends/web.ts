import React from 'react'
import { renderer } from 'reactxx-fela'

import { TExtends, TCompiler } from '../typings/index'
import { classNames } from './class-names'
/******************************************
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
declare module 'react' {
  interface HTMLAttributes<T> extends TExtends.CommonProperties {
  }
  interface SVGAttributes<T> extends TExtends.CommonProperties {
  }
}

export const createElement = (type, props: TExtends.CommonProperties, ...children) => {
  if (!props) return React.createElement(type, props, ...children)
  const { classNameX, styleX } = props
  if (classNameX) {
    const compiled = Array.isArray(classNameX) ? classNames(...classNameX as TExtends.ClassNameItem[]) : classNames(classNameX)
    delete props.classNameX
    props.className = normalizeValues(compiled)
  }
  return React.createElement(type, props, ...children)
}

// apply LAST WIN strategy for web className
const normalizeValues = (values: TCompiler.Values) => {
  const res: TCompiler.ValueWeb[] = []
  const usedPropIds: { [propId: string]: boolean } = {}
  for (let k = values.length - 1; k >= 0; k--) {
    const value = values[k] as TCompiler.ValueWeb
    const propId = renderer.propIdCache[value]
    if (!propId) continue
    if (usedPropIds[propId]) continue
    usedPropIds[propId] = true
    res.push(value)
  }
  return res.join(' ')
}

