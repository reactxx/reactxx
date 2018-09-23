import React from 'react'
import { renderer } from 'reactxx-fela'

import { TAtomize, TSheeter, TComponents } from '../d-index'
import { toClassNames, deleteSystemProps } from '../sheeter/to-classnames'
import { mergeStyles } from '../sheeter/merge'
import { atomizeStyle } from '../sheeter/atomize'
/******************************************
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
declare module 'react' {
  interface HTMLAttributes<T> extends TComponents.ReactsCommonProperties {
  }
  interface SVGAttributes<T> extends TComponents.ReactsCommonProperties {
  }
}

export const createElement = (type, props: TComponents.ReactsCommonProperties & { className?, style?}, ...children) => {
  if (!props) return React.createElement(type, props, ...children)
  const { classNameX, styleX } = props
  const isXXComponent = isReactXXComponent(type)

  if (classNameX) {
    const compiled = Array.isArray(classNameX) ? toClassNames(...classNameX as TSheeter.RulesetItem[]) : toClassNames(classNameX)
    if (isXXComponent)
      props.classNameX = compiled
    else {
      delete props.classNameX
      if (!props.className) props.className = applyLastWinStrategy(compiled)
      else props.className += ' ' + applyLastWinStrategy(compiled)
    }
  }

  if (styleX) {
    if (!isXXComponent) {
      // we cannot recognize when styleX is compiled => styleX are compiled in build-in component only
      props.style = mergeStyles<'web'>([atomizeStyle(styleX, null)])
    }
  }
  if (!isXXComponent) deleteSystemProps(props)
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

const isReactXXComponent = type => type[TAtomize.TypedInterfaceProp] === TAtomize.TypedInterfaceTypes.reactxxComponent