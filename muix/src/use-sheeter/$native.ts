import React from 'react';
import { TEngine } from 'reactxx-typings';
import { deleteSystemProps, platform } from 'reactxx-sheeter';

import { TComponents } from './typings/components'
import { isReactXXComponent, TAsEngineClassName } from './utils/from-engine';

interface ReactsCommonPropertiesNative {
  style?: TEngine.AtomicNativeLows
}

export const createElement = (type, props: TComponents.ReactsCommonProperties & ReactsCommonPropertiesNative, ...children) => {
  
  if (!props || isReactXXComponent(type)) return React.createElement(type, props, ...children)

  const { classNames, styles } = props

  if (classNames) {
    let reduced = platform.applyLastwinsStrategy(TAsEngineClassName(classNames)) as TEngine.AtomicNativeLows
    props.style = platform.finalizeClassName(reduced) as TEngine.AtomicNativeLows
    if (styles) Object.assign(props.style, styles)
    if (window.__TRACE__)
      props['data-trace'] = dataTrace(reduced, window.__TRACE__.dataTraceFlag)
  }

  deleteSystemProps(props)

  return React.createElement(type, props, ...children)
}

const dataTrace = (ruleset, flags = 'long') => {
  if (!ruleset) return ''
  const res = []
  for (const p in ruleset) {
      const val = ruleset[p] as TEngine.__dev_AtomicNative
      if (typeof val === 'undefined' || !window.__TRACE__ || flags === 'short') continue

      res.push(`${p} @${val.tracePath}`)
  }
  return res.length > 0 ? '\n' + res.join('\n') : ''
}

