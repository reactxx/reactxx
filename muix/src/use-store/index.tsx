import React from 'react'

export const useStoreLow = <TState, THandler extends IHandlerLow>(
    store: StoreLow<TState, THandler>,
    uniqueId: number,
    forceUpdate: (p) => void,
    initHandler?: (handler: THandler) => void,
    dontSaveToStore?: (handler: THandler) => boolean,
) => {

    let handler = store.handlers[uniqueId]
    let inStore = true
    if (!handler) {
        inStore = false
        handler = { forceUpdate } as THandler
        initHandler && initHandler(handler)
    }

    React.useEffect(() => {

        if (!inStore && (!dontSaveToStore || !dontSaveToStore(handler)))
            store.handlers[uniqueId] = handler
        return () => delete store.handlers[uniqueId] // unmount => remove handler
    }, [])

    return handler // return actual state and dispatcher
}

export abstract class StoreLow<TState, THandler extends IHandlerLow> {

    constructor(protected state: TState) { }

    setState = (newState: TState) => {
        const oldState = this.state
        this.state = newState
        for (const p in this.handlers) this.refreshHandler(this.handlers[p], oldState, newState)
    }


    abstract refreshHandler(handler: THandler, oldState: TState, newState: TState)

    counter = 0
    handlers: Record<number, THandler> = {}
}
export interface IHandlerLow {
    forceUpdate: (state: null) => void
}

export const useStore = <TSelected, TState>(
    store: Store<TState>,
    uniqueId: number,
    forceUpdate: (p) => void,
    selector?: (st: TState) => TSelected,
    dontSaveToStore?: (handler: IHandler) => boolean,
) => {
    if (selector === null) return [null, this]
    const handler = useStoreLow(
        store,
        uniqueId,
        forceUpdate,
        handler => {
            handler.selector = selector
            handler.actState = store.applySelector(this.state, selector)
        },
        dontSaveToStore
    )
    return [handler.actState, this]
}

export class Store<TState> extends StoreLow<TState, IHandler> {

    applySelector = (st, selector) => selector ? selector(st) : st

    refreshHandler(handler: IHandler, oldState, newState) {
        const newActState = this.applySelector(newState, handler.selector) // new state selection
        if (shallowEqualObjects(handler.actState, newActState)) return // is the same as old one => NOP
        handler.actState = newActState // set newState
        handler.forceUpdate(null) // forceUpdate
    }

}
interface IHandler extends IHandlerLow {
    actState
    selector
}


// modified https://github.com/moroshko/shallow-equal/blob/master/src/objects.js
const shallowEqualObjects = (objA: {}, objB: {}) => {
    if (objA === objB || !objA && !objB) return true
    if (!objA || !objB) return false
    const aKeys = Object.keys(objA), bKeys = Object.keys(objB), aLen = aKeys.length
    if (bKeys.length !== aLen) return false
    for (let i = 0; i < aLen; i++) {
        const key = aKeys[i]
        if (objA[key] !== objB[key]) return false
    }
    return true
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
// https://github.com/lodash/lodash/blob/master/eq.js
// if (!Object.is)
//     Object.is = (value, other) => value === other || (value !== value && other !== other)

