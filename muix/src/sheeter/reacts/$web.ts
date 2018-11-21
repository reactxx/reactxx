import React from 'react'
import { TAtomize, TVariants, TComponents } from 'reactxx-typings'

import { deleteSystemProps } from '../utils/to-classnames'
import { mergeStyles } from '../utils/merge'
import { isReactXXComponent } from '../utils/atomize'
import { platform } from '../index'

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

export const createElement = (type, props: TComponents.ReactsCommonProperties & TComponents.ReactsCommonPropertiesWeb, ...children) => {

  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$native
  consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  //******* for non reactxx components: 

  const { classNameX, styleX } = props

  if (classNameX) {
    let lastWinResult = applyLastwinsStrategy(classNameX) as TAtomize.AtomicWebsLow
    const className = finalizeClassName(lastWinResult)
    props.className = props.className ? className + ' ' + props.className : className
    //if (window.__TRACELEVEL__ >= 2) 
    if (window.__TRACE__)
      props['data-class-trace'] = platform.dumpAtomized(lastWinResult)
  }

  if (styleX) {
    props.style = mergeStyles(styleX) as React.CSSProperties
  }

  deleteSystemProps(props)
  return React.createElement(type, props, ...children)
}

export const finalizeClassName = (lastWinResult: TAtomize.AtomicWebsLow) => {
  if (!lastWinResult) return undefined
  if (window.__TRACE__) {
    lastWinResult = lastWinResult.map((r: TAtomize.__dev_AtomicWeb) => r.cache.className) as any
  }
  return lastWinResult.join(' ')
}

//export const applyLastwinsStrategy = (values: TAtomize.AtomicArray) => applyLastwinsStrategyRoot(values, applyLastwinsStrategyLow) as TAtomize.AtomicWebsLow

// apply LAST WIN strategy for web className
export const applyLastwinsStrategy: TVariants.ApplyLastwinsStrategy = (values: TAtomize.Ruleset) => {
  if (!values) return null

  const { renderer } = platform

  const res: TAtomize.AtomicWeb[] = []
  const usedPropIds: { [propId: string]: boolean } = {}

  for (let i = values.length - 1; i >= 0; i--)
    for (let k = values[i].length - 1; k >= 0; k--) {
      let value = values[i] && values[i][k]
      if (!value) continue
      if (Array.isArray(value)) {
        throw 'WHAT IS THIS CODE?'
        Array.prototype.push.apply(res, value)
        continue
      }
      let className: string = value as string
      if (window.__TRACE__) {
        className = (value as TAtomize.__dev_AtomicWeb).cache.className
      }
      const propId = renderer.propIdCache[className]
      if (!propId || usedPropIds[propId])
        continue
      res.push(value as TAtomize.AtomicWeb)
      usedPropIds[propId] = true
    }

  return res as TAtomize.AtomicArrayLow
}

const consolidateEvents = (props: TComponents.Props & TComponents.Events & TComponents.EventsWeb) => {
  const { onPress, onLongPress, onPressIn, onPressOut, $web } = props
  if (onPress) {
    if (!$web || !$web.onClick) props.onClick = onPress
    delete props.onPress
  }
  if (onPressIn) {
    if (!$web || !$web.onMouseDown) props.onMouseDown = onPress
    delete props.onPressIn
  }
  if (onPressOut) {
    if (!$web || !$web.onMouseUp) props.onMouseUp = onPress
    delete props.onPressOut
  }
  if (onLongPress) {
    delete props.onLongPress
  }

}