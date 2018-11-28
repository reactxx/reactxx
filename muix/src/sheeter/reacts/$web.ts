import React from 'react';
import { TComponents, TEngine, TTyped } from 'reactxx-typings';
import { platform, ApplyLastwinsStrategy } from '../index';
import { isReactXXComponent } from '../utils/typed';
import { deleteSystemProps } from '../utils/to-classnames';


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

export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesWeb, ...children) => {

  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$native
  //consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  //******* for non reactxx components: 

  const { classNameX, styleX } = props

  if (classNameX) {
    let lastWinResult = applyLastwinsStrategy(classNameX) as TEngine.AtomicWebsLow
    const className = finalizeClassName(lastWinResult)
    props.className = props.className ? className + ' ' + props.className : className
    //if (window.__TRACELEVEL__ >= 2) 
    if (window.__TRACE__)
      props['data-trace'] = platform.dataTrace(lastWinResult, window.__TRACE__.dataTraceFlag)
  }

  if (styleX) {
    props.style = styleX as React.CSSProperties
  }

  deleteSystemProps(props)
  return React.createElement(type, props, ...children)
}

export const finalizeClassName = (lastWinResult: TEngine.AtomicWebsLow) => {
  if (!lastWinResult) return undefined
  if (window.__TRACE__) {
    lastWinResult = lastWinResult.map((r: TEngine.__dev_AtomicWeb) => r.cache.className) as any
  }
  return lastWinResult.join(' ')
}

//export const applyLastwinsStrategy = (values: TAtomize.AtomicArray) => applyLastwinsStrategyRoot(values, applyLastwinsStrategyLow) as TAtomize.AtomicWebsLow

// apply LAST WIN strategy for web className
export const applyLastwinsStrategy: ApplyLastwinsStrategy = (values: TEngine.Queryables) => {
  if (!values) return null

  const { renderer } = platform

  const res: TEngine.AtomicWeb[] = []
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
        className = (value as TEngine.__dev_AtomicWeb).cache.className
      }
      const propId = renderer.propIdCache[className]
      if (!propId || usedPropIds[propId])
        continue
      res.push(value as TEngine.AtomicWeb)
      usedPropIds[propId] = true
    }

  return res as TEngine.AtomicArrayLow
}

interface ReactsCommonPropertiesWeb {
  className?: string
  styleX?: TTyped.StyleSimple
  style?: React.CSSProperties
  $native?
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