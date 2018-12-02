import React from 'react';
import { TEngine } from 'reactxx-typings';
import { deleteSystemProps, toClassNamesWithQuery, platform } from 'reactxx-sheeter';

import { TComponents } from './typings/components'

import { isReactXXComponent } from './utils/from-engine';


export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesNative, ...children) => {
  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$web
  //consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  const { css, styles } = props

  if (css || styles) {
    let style =
      styles
        ? toClassNamesWithQuery(null, css, styles)
        : css
    let reduced = platform.applyLastwinsStrategy(style) as TEngine.AtomicNativeLow
    props.style = platform.finalizeClassName(reduced) as TEngine.AtomicNativeLow
    if (window.__TRACE__)
      props['data-trace'] = platform.dataTrace(reduced, window.__TRACE__.dataTraceFlag)
  }

  deleteSystemProps(props)

  return React.createElement(type, props, ...children)
}

interface ReactsCommonPropertiesNative {
  styleX?: TEngine.Queryables
  style?: TEngine.AtomicNativeLow
  $web?
}

