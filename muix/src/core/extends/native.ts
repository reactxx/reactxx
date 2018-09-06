import React from 'react'
import { TExtends, TCompiler } from '../typings/index'
/******************************************
  EXTEND REACT NATIVE
*******************************************/
declare module 'react-native' {
    interface ViewProperties extends TExtends.CommonProperties {
    }
    interface TextProperties extends TExtends.CommonProperties {
    }
    interface ImageProperties extends TExtends.CommonProperties {
    }
  }

  export const createElement = (type, props: TExtends.CommonProperties, ...children) => {
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
export const normalizeValues: TExtends.NormalizeClassNames = (values: TCompiler.Values) => {
  const res: TCompiler.PlatformValuesNative = {}
  for (let k = values.length - 1; k >= 0; k--) {
      const value = values[k] as TCompiler.ValueNative
      if (typeof res[value.propId] !== 'undefined') continue
      res[value.propId] = value.value
  }
  return res
}

  