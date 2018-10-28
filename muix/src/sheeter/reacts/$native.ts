import React from 'react'
import { TComponents, TAtomize } from 'reactxx-typings'
import { deleteSystemProps, toClassNamesWithQuery } from '../to-classnames'

import { applyLastwinsStrategyRoot, ApplyLastWinStrategyLow, AttemptType, ApplyLastWinStrategyResult } from '../utils/apply-last-win-strategy'
import { isReactXXComponent, isDeffered } from '../atomize'
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
    let reduced = applyLastwinsStrategy(style)
    props.style = finalizeClassName(reduced)
    if (window.__TRACELEVEL__ >= 2)
      props.trace = platform.dumpAtomized(reduced)
  }

  deleteSystemProps(props)

  return React.createElement(type, props, ...children)
}

export const applyLastwinsStrategy = (values: TAtomize.AtomicArray) => applyLastwinsStrategyRoot(values, applyLastWinStrategyLow) as TAtomize.AtomicNativeLow

export const finalizeClassName = (lastWinResult: TAtomize.AtomicNativeLow) => {
  if (window.__TRACE__) {
    const res = {}
    for (const p in lastWinResult) res[p] = (lastWinResult[p] as TAtomize.__dev_AtomicNative).value
    return res
  }
  return lastWinResult
}

const applyLastWinStrategyLow: ApplyLastWinStrategyLow = (values, attemptType) => {
  const res: TAtomize.NativeStyle = {}
  let idxs: number[] = []
  let defferedFound = false
  const usedPropIds: { [propId: string]: boolean } = {}
  for (let k = values.length - 1; k >= 0; k--) {
    const value = values[k] as TAtomize.AtomicNative
    if (!value) continue
    if (attemptType !== AttemptType.second) {
      if (isDeffered(value)) {
        if (attemptType !== AttemptType.firstIgnore) {
          idxs.push(k)
          defferedFound = true
        }
        continue
      }
    } else {
      if (Array.isArray(value)) {
        Array.prototype.push.apply(res, value)
        continue
      }
    }
    if (defferedFound) continue // first attempt and deffered found => ignore other values
    // last win strategy
    if (typeof res[value.propId] !== 'undefined') continue
    res[value.propId] = value.value
  }
  return (attemptType !== AttemptType.second && defferedFound ? { defferedIdxs: idxs } : { style: res }) as ApplyLastWinStrategyResult

}
