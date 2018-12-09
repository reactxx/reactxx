import React from 'react';

import Fela from 'reactxx-fela'
import { TEngine } from 'reactxx-typings';
import { deleteSystemProps, platform } from 'reactxx-sheeter';

import { TComponents } from './typings/components'
import { isReactXXComponent, TAsEngineClassName } from './utils/from-engine';

interface ReactsCommonPropertiesWeb {
  className?: string
  style?: React.CSSProperties
}

export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesWeb, ...children) => {

  if (!props || isReactXXComponent(type)) return React.createElement(type, props, ...children)

  const { classNames, styles } = props

  if (classNames) {
    let lastWinResult = platform.applyLastwinsStrategy(TAsEngineClassName(classNames)) as TEngine.AtomicWebLows
    const className = platform.finalizeClassName(lastWinResult) as string
    props.className = props.className ? className + ' ' + props.className : className
    if (window.__TRACE__)
      props['data-trace'] = dataTrace(lastWinResult, window.__TRACE__.dataTraceFlag)
  }

  if (styles) {
    props.style = styles as React.CSSProperties
  }

  deleteSystemProps(props)
  return React.createElement(type, props, ...children)
}

const dataTrace = Fela.dataTrace
const consolidateEvents = (props: TComponents.Props & TComponents.Events & TComponents.EventsWeb) => {
  // const { onPress, onLongPress, onPressIn, onPressOut, $web } = props
  // if (onPress) {
  //   if (!$web || !$web.onClick) props.onClick = onPress
  //   delete props.onPress
  // }
  // if (onPressIn) {
  //   if (!$web || !$web.onMouseDown) props.onMouseDown = onPress
  //   delete props.onPressIn
  // }
  // if (onPressOut) {
  //   if (!$web || !$web.onMouseUp) props.onMouseUp = onPress
  //   delete props.onPressOut
  // }
  // if (onLongPress) {
  //   delete props.onLongPress
  // }

}