import React from 'react';
import { TEngine } from 'reactxx-typings';
import { deleteSystemProps, platform } from 'reactxx-sheeter';

import { TComponents } from './typings/components'
import { TAsTypedClassName, TAsEngineStyle } from './utils/from-engine'
import { isReactXXComponent } from './utils/from-engine';
import warning = require('warning');
import { isObject } from 'util';


export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesNative, ...children) => {
  if (!props) return React.createElement(type, props, ...children)

  const isXXComponent = isReactXXComponent(type)

  delete props.$web
  //consolidateEvents(props)

  if (isXXComponent) return React.createElement(type, props, ...children)

  const { css, styles } = props

  //warning(!styles, 'Use styles prop during component rendering (in native component is ignored)')

  if (css) {
    // let style =
    //   styles
    //     ? toClassNamesWithQuery(null, css, styles)
    //     : css
    let reduced = platform.applyLastwinsStrategy(css as any) as TEngine.AtomicNativeLows
    props.style = platform.finalizeClassName(reduced) as TEngine.AtomicNativeLows
    if (styles) Object.assign(props.style, styles)
    if (window.__TRACE__)
      props['data-trace'] = dataTrace(reduced, window.__TRACE__.dataTraceFlag)
  }

  deleteSystemProps(props)

  return React.createElement(type, props, ...children)
}

const dataTrace = (ruleset, flags = 'long') => {
  //if (!ruleset || Array.isArray(ruleset) || !(typeof ruleset === 'object')) return ruleset
  if (!ruleset) return ''
  const res = []
  for (const p in ruleset) {
      const val = ruleset[p] as TEngine.__dev_AtomicNative
      if (typeof val === 'undefined' || !window.__TRACE__ || flags === 'short') continue

      res.push(`${p} @${val.tracePath}`)
  }
  return res.length > 0 ? '\n' + res.join('\n') : ''
}

interface ReactsCommonPropertiesNative {
  styleX?: TEngine.Queryables
  style?: TEngine.AtomicNativeLows
  $web?
}

