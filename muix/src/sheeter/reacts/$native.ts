import React from 'react'
import { TComponents, TAtomize } from 'reactxx-typings'

import { applyLastWinStrategyHigh, ApplyLastWinStrategyLow, AttemptType, ApplyLastWinStrategyResult } from '../utils/apply-last-win-strategy'
import { isReactXXComponent, isDeffered } from '../atomize'

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

export const createElement = (type, props: TComponents.ReactsCommonProperties, ...children) => {
  if (!props) return React.createElement(type, props, ...children)

  const { classNameX, styleX } = props
  const style = applyLastWinStrategyHigh(classNameX, applyLastWinStrategyLow)
  // const { classNameX, styleX } = props
  // if (classNameX) {
  //     const compiled = Array.isArray(classNameX) ? classNames(...classNameX) : classNames(classNameX)
  //     delete props.classNameX
  //     props.className = normalizeValues(compiled)
  // }
  // const compiled = Array.isArray(props.css) ? classNames(...props.classNamex) : classNames(props.classNamex)
  // delete props.css
  // warning(!props.className, `Both "css" and "className" property used, className will be ignored`)
  return React.createElement(type, props, ...children)
}

export const applyLastWinStrategy = (values: TAtomize.AtomicArray) => applyLastWinStrategyHigh(values, applyLastWinStrategyLow)

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
