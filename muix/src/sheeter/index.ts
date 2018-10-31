import React from 'react'

export * from './utils/deep-merge'
export * from './atomize'
export * from './globals'
export * from './atomize-low'
export * from './conditions'
export * from './merge'
export * from './to-classnames'
export * from './utils/wrap-pseudo-prefixes'

import { init } from './$web'
import { initGlobals } from './globals'

export const initSheeter$Web = (force?: boolean) => initGlobals(force, init)
export const initSheeter = initSheeter$Web

initSheeter()

declare module 'react' {
    const useState: <T extends {}>(defState: T) => [T, (newState: T) => void]
    const useEffect: (effect: () => void, changes?: Array<any>) => () => void
    const useContext: <T>(context: React.Context<T>) => T
    const memo: <T>(comp: T) => T
}
declare module 'prop-types' {
    type InferProps<T> = any
    let exact
}
