import React from 'react'
import { renderer } from 'reactxx-fela'

import { TExtends, TCompiler, TSheeter } from '../index-d'
import { classNames, deleteUnusedProps } from './class-names'
import { styles } from './styles'
/******************************************
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
declare module 'react' {
  interface HTMLAttributes<T> extends TSheeter.CommonProperties {
  }
  interface SVGAttributes<T> extends TSheeter.CommonProperties {
  }
}

export const createElement = (type, props: TSheeter.CommonProperties & { className?, style? }, ...children) => {
  if (!props) return React.createElement(type, props, ...children)
  const { classNameX, styleX } = props
  deleteUnusedProps(props)
  // classNameX are compiled as soon as possible
  if (classNameX) {
    const compiled = Array.isArray(classNameX) ? classNames(...classNameX as TExtends.ClassNameItem[]) : classNames(classNameX)
    if (isReactBuildInComponent(type)) {
      delete props.classNameX
      if (!props.className) props.className = normalizeValues(compiled)
      else props.className += ' ' + normalizeValues(compiled)
    } else
      props.classNameX = compiled
  }
  // styleX are compiled as late as possible
  if (styleX) {
    if (isReactBuildInComponent(type)) {
      // we cannot recognize when styleX is compiled => styleX are compiled in build-in component only
      const compiled = Array.isArray(styleX) ? styles(...styleX) : styles(styleX)
      delete props.styleX
      props.style = compiled
    } 
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

const isReactBuildInComponent = type => typeof type === 'string'