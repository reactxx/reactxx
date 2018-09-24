import React from 'react'
import { renderer } from 'reactxx-fela'

import { TAtomize, TComponents } from '../d-index'
import { toClassNamesWithQuery, deleteSystemProps } from '../sheeter/to-classnames'
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
  
  const isXXComponent = isReactXXComponent(type)
  if (!props || isXXComponent) return React.createElement(type, props, ...children)
  
  const { classNameX, styleX } = props

  if (classNameX) {
      const compiled = toClassNamesWithQuery(null, null, classNameX)
      if (!props.className) props.className = applyLastWinStrategy(compiled)
      else props.className += ' ' + applyLastWinStrategy(compiled)
  }

  if (styleX) 
      props.style = mergeStyles<'web'>([atomizeStyle(styleX, null)])

  deleteSystemProps(props)
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