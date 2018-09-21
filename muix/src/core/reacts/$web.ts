import React from 'react'
import { renderer } from 'reactxx-fela'

import { TAtomize, TSheeter, TComponents } from '../d-index'
import { classNames, deleteUnusedProps } from '../sheeter/class-names'
import { styles } from '../sheeter/styles'
/******************************************
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
declare module 'react' {
  interface HTMLAttributes<T> extends TComponents.CommonProperties {
  }
  interface SVGAttributes<T> extends TComponents.CommonProperties {
  }
}

export const createElement = (type, props: TComponents.CommonProperties & { className?, style?}, ...children) => {
  if (!props) return React.createElement(type, props, ...children)
  const { classNameX, styleX } = props
  deleteUnusedProps(props)
  // classNameX are compiled as soon as possible
  if (classNameX) {
    const compiled = Array.isArray(classNameX) ? classNames(...classNameX as TSheeter.ClassNameItem[]) : classNames(classNameX)
    if (isReactxxComponent(type))
      props.classNameX = compiled
    else {
      delete props.classNameX
      if (!props.className) props.className = applyLastWinStrategy(compiled)
      else props.className += ' ' + applyLastWinStrategy(compiled)
    }
  }
  // styleX are compiled as late as possible
  if (styleX) {
    if (!isReactxxComponent(type)) {
      // we cannot recognize when styleX is compiled => styleX are compiled in build-in component only
      const compiled = Array.isArray(styleX) ? styles(...styleX) : styles(styleX)
      delete props.styleX
      props.style = compiled
    }
  }
  return React.createElement(type, props, ...children)
}

// apply LAST WIN strategy for web className
const applyLastWinStrategy = (values: TAtomize.AtomicArray) => {
  const res: TAtomize.AtomicWeb[] = []
  const usedPropIds: { [propId: string]: boolean } = {}
  for (let k = values.length - 1; k >= 0; k--) {
    const value = values[k] as TAtomize.AtomicWeb
    const propId = renderer.propIdCache[value]
    if (!propId) continue
    if (usedPropIds[propId]) continue
    usedPropIds[propId] = true
    res.push(value)
  }
  return res.join(' ')
}

const isReactxxComponent = type => type[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.reactxxComponent