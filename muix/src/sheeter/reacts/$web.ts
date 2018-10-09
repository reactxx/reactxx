import React from 'react'
import warning from 'warning'
import { renderer } from 'reactxx-fela'
import { TAtomize, TComponents, TSheeter } from 'reactxx-typings'

import { deleteSystemProps } from '../to-classnames'
import { mergeStyles } from '../merge'
import { isReactXXComponent, isDeffered } from '../atomize'
import { applyLastWinStrategy, AttemptType, ApplyLastWinStrategyResult, ApplyLastWinStrategyLow } from '../utils/apply-last-win-strategy'

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

export const createElement = (type, props: TComponents.ReactsCommonProperties & { className?, style?} & TComponents.Events, ...children) => {

  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$native
  consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  //******* for non reactxx components: 

  const { classNameX, styleX } = props

  if (classNameX) {
    const className = applyLastWinStrategy(classNameX, applyLastWinStrategyLow)
    props.className = props.className ? className + ' ' + props.className : className
  }

  if (styleX) {
    props.style = mergeStyles(styleX)
  }

  deleteSystemProps(props)
  return React.createElement(type, props, ...children)
}

// apply LAST WIN strategy for web className
const applyLastWinStrategyLow: ApplyLastWinStrategyLow = (values, attemptType) => {
  const res: string[] = []
  let idxs: number[] = []
  let defferedFound = false
  const usedPropIds: { [propId: string]: boolean } = {}
  for (let k = values.length - 1; k >= 0; k--) {
    const value = values[k]
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
    const propId = renderer.propIdCache[value as string]
    if (!propId || usedPropIds[propId]) continue
    res.push(value as string)
    usedPropIds[propId] = true
  }
  return (attemptType !== AttemptType.second && defferedFound ? { defferedIdxs: idxs } : { style: res.join(' ') }) as ApplyLastWinStrategyResult
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