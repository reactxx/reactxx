import React from 'react'
import { TComponents, TAtomize, TVariants } from 'reactxx-typings'
import { deleteSystemProps, toClassNamesWithQuery } from '../to-classnames'

import { isReactXXComponent } from '../atomize'
import { platform } from '../index-native'

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

export const createElement = (type, props: TComponents.ReactsCommonProperties & TComponents.ReactsCommonPropertiesNative, ...children) => {
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
    let reduced = applyLastwinsStrategy(style) as TAtomize.AtomicNativeLow
    props.style = finalizeClassName(reduced)
    if (window.__TRACELEVEL__ >= 2)
      props.trace = platform.dumpAtomized(reduced)
  }

  deleteSystemProps(props)

  return React.createElement(type, props, ...children)
}

//export const applyLastwinsStrategy = (values: TAtomize.AtomicArray) => applyLastwinsStrategyRoot(values, applyLastWinStrategyLow) as TAtomize.AtomicNativeLow

export const finalizeClassName = (lastWinResult: TAtomize.AtomicNativeLow) => {
  if (window.__TRACE__) {
    const res = {}
    for (const p in lastWinResult) res[p] = (lastWinResult[p] as TAtomize.__dev_AtomicNative).value
    return res
  }
  return lastWinResult
}

export const applyLastwinsStrategy: TVariants.ApplyLastwinsStrategy = values => {//(values: TAtomize.AtomicWeb[]) => {
  const res: TAtomize.NativeStyle = {}
  let idxs: number[] = []
  const usedPropIds: { [propId: string]: boolean } = {}
  for (let k = values.length - 1; k >= 0; k--) {
    const value = values[k] as TAtomize.AtomicNative
    if (!value) continue
      if (Array.isArray(value)) {
        Array.prototype.push.apply(res, value)
        continue
    }
    // last win strategy
    if (typeof res[value.propId] !== 'undefined') continue
    res[value.propId] = value.value
  }
  return res as TAtomize.AtomicArrayLow

}
