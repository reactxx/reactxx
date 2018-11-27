import React from 'react';
import { TComponents, TEngine, TVariants } from 'reactxx-typings';
import { platform } from '../index-native';
import { isReactXXComponent } from '../utils/atomize';
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
        ? toClassNamesWithQuery(null, [classNameX, styleX])
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

export const applyLastwinsStrategy: TVariants.ApplyLastwinsStrategy = values => {
  if (!values) return null
  const res: TEngine.NativeStyle = {}
  let idxs: number[] = []
  const usedPropIds: { [propId: string]: boolean } = {}
  for (let i = values.length - 1; i >= 0; i--)
    for (let k = values.length - 1; k >= 0; k--) {
      let value = values[i] && values[i][k]
      if (!value) continue
      if (Array.isArray(value)) {
        Array.prototype.push.apply(res, value)
        continue
      }
      // last win strategy
      if (typeof res[value.propId] !== 'undefined') continue
      res[value.propId] = value.value
    }
  return res as TEngine.AtomicArrayLow
}

interface ReactsCommonPropertiesNative {
  styleX?: TEngine.Queryables
  style?: TEngine.AtomicNativeLow
  $web?
}

