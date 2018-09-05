import React from 'react'
import { classNames } from './query'
import warning from 'warning'
// platform dependent import
import { normalizeValues } from 'reactxx-core'

export const createElement = (type, props, ...children) => {
    if (!props) return React.createElement(type, props, ...children)
    //const {} 
    const compiled = Array.isArray(props.css) ? classNames(...props.classNamex) : classNames(props.classNamex)
    delete props.css
    warning(!props.className, `Both "css" and "className" property used, className will be ignored`)
    props.className = normalizeValues(compiled)
    return React.createElement(type, props, ...children)
}

const isPlatformType = type => typeof type !== 'string'
