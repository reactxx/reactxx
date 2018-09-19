import React from 'react'
import { TComponents, TAtomize } from '../d-index'
/******************************************
  EXTEND REACT NATIVE
*******************************************/
declare module 'react-native' {
    interface ViewProperties extends TComponents.CommonProperties {
    }
    interface TextProperties extends TComponents.CommonProperties {
    }
    interface ImageProperties extends TComponents.CommonProperties {
    }
  }

  export const createElement = (type, props: TComponents.CommonProperties, ...children) => {
    if (!props) return React.createElement(type, props, ...children)
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

  
  // apply LAST WIN strategy for native style
export const normalizeValues = (values: TAtomize.AtomicArray) => {
  const res: Record<string, string | number>/*TCompiler.PlatformValuesNative*/ = {}
  for (let k = values.length - 1; k >= 0; k--) {
      const value = values[k] as TAtomize.AtomicNative
      if (typeof res[value.propId] !== 'undefined') continue
      res[value.propId] = value.value
  }
  return res
}

  