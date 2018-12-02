import React from 'react';
import { TEngine } from 'reactxx-typings';
import { deleteSystemProps, platform } from 'reactxx-sheeter';

import { TComponents } from './typings/components'
import { toEngineClassName, fromEngineStyle } from './utils/from-engine'
import { isReactXXComponent } from './utils/from-engine';
import warning = require('warning');


export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesNative, ...children) => {
  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$web
  //consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  const { css, styles } = props

  warning(!styles, 'Use styles prop during component rendering (in native component is ignored)')

  if (css) {
    // let style =
    //   styles
    //     ? toClassNamesWithQuery(null, css, styles)
    //     : css
    let reduced = platform.applyLastwinsStrategy(css as any) as TEngine.AtomicNativeLow
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

