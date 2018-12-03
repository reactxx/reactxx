import React from 'react';

import Fela from 'reactxx-fela'
import { TEngine, TTyped } from 'reactxx-typings';
import { deleteSystemProps, platform } from 'reactxx-sheeter';

import { TComponents } from './typings/components'

import { isReactXXComponent } from './utils/from-engine';


export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesWeb, ...children) => {

  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$native
  //consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  //******* for non reactxx components: 

  const { css, styles } = props

  if (css) {
    let lastWinResult = platform.applyLastwinsStrategy(css as any) as TEngine.AtomicWebLows
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