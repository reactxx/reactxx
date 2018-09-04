import React from 'react'
import { ClassName } from './types'
import { classNames } from './query'
import warning from 'warning'
// platform dependent import
import { normalizeClassNames } from 'reactxx-core'

//https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
declare module 'react' {
    interface HTMLAttributes<T> {
        css?: ClassName | ClassName[]
    }
    interface SVGAttributes<T> {
        css?: ClassName | ClassName[]
    }
}

export const ReactXX = (type, props, ...children) => {
    if (!props || typeof type !== 'string' || !props.css)
        return React.createElement(type, props, ...children)
    const compiled = Array.isArray(props.css) ? classNames(...props.css) : classNames(props.css)
    delete props.css
    warning(!props.className, `Both "css" and "className" property used, className will be ignored`)
    props.className = normalizeClassNames(compiled)
    return React.createElement(type, props, ...children)
}
