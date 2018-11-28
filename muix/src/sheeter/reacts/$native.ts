import React from 'react';
import { TComponents, TEngine } from 'reactxx-typings';
import { platform, ApplyLastwinsStrategy } from '../index-native';
import { isReactXXComponent } from '../utils/typed';
import { deleteSystemProps, toClassNamesWithQuery } from '../utils/to-classnames';


/******************************************
  EXTEND REACT NATIVE
*******************************************/
declare module 'react-native' {
  interface ViewProperties extends TComponents.ReactsCommonProperties {
  }
  interface TextProperties extends TComponents.ReactsCommonProperties {
  }
  interface ImageProperties extends TComponents.ReactsCommonProperties {
  }
}

export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesNative, ...children) => {
  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$web
  //consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  const { classNameX, styleX } = props

  if (classNameX || styleX) {
    let style =
      styleX
        ? toClassNamesWithQuery(null, classNameX, styleX)
        : classNameX
    let reduced = applyLastwinsStrategy(style) as TEngine.AtomicNativeLow
    props.style = finalizeClassName(reduced)
    if (window.__TRACE__)
      props['data-trace'] = platform.dataTrace(reduced, window.__TRACE__.dataTraceFlag)
  }

  deleteSystemProps(props)

  return React.createElement(type, props, ...children)
}

export const finalizeClassName = (lastWinResult: TEngine.AtomicNativeLow) => {
  if (!lastWinResult) return undefined
  if (window.__TRACE__) {
    const res = {}
    for (const p in lastWinResult) res[p] = (lastWinResult[p] as TEngine.__dev_AtomicNative).value
    return res
  }
  return lastWinResult
}

export const applyLastwinsStrategy: ApplyLastwinsStrategy = values => {
  if (!values) return null
  const res: TEngine.NativeStyle = {}
  for (let i = values.length - 1; i >= 0; i--) {
    const vals = values[i] as any[]
    if (!vals) continue
    for (let k = vals.length - 1; k >= 0; k--) {
      let value = vals[k]
      if (!value) continue
      if (Array.isArray(value)) {
        Array.prototype.push.apply(res, value)
        continue
      }
      // last win strategy
      if (typeof res[value.propId] !== 'undefined') continue
      res[value.propId] = value.value
    }
  }
  return res as TEngine.AtomicArrayLow
}

interface ReactsCommonPropertiesNative {
  styleX?: TEngine.Queryables
  style?: TEngine.AtomicNativeLow
  $web?
}

