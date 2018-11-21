import React from 'react'
import { StoreLow, IHandlerLow, useStoreLow } from 'reactxx-use-store'
import { platform } from 'reactxx-sheeter'

// called first (in useReactxx hook)
export const useWidthsLow = () => {
    const handler = useStoreLow(store, null)
    handler.breakpoints = new Set()
    handler.actWidth = store.state
    React.useEffect(() => {
        // for web: adjust media query for watched breakpoints
        handler.breakpoints.forEach(br => platform.addBreakpoint(br))
    })
    return handler
}

// called in component code (after useWidthsLow call)
export const useWidths = (handler: IHandler, breakpoints?: number[]) => {
    if (window.__TRACE__) {
        let last = 0
        breakpoints.forEach(b => {
            if (b <= last) throw 'useWidths argument error: array of increasing numbers (greater than zero) expected'
            last = b + 1
        })
    }
    // add breakpoints for change detection
    breakpoints.forEach(b => handler.breakpoints.add(b))

    // just single array item is true
    let found = breakpoints.findIndex(b => handler.actWidth < b)
    if (found < 0) found = breakpoints.length
    const res: boolean[] = []
    res[found] = true
    return res

}

export class WidthStore extends StoreLow<number, IHandler> {

    state: number

    refreshHandler(handler: IHandler, oldWidth: number, newWidth: number) {
        if (oldWidth === newWidth) return
        handler.actWidth = newWidth
        let noChange = true
        handler.breakpoints.forEach(br => noChange = noChange &&
            (newWidth >= br && oldWidth >= br || newWidth < br && oldWidth < br))
        if (noChange) return
        handler.forceUpdate(null)
    }

}

export type TWidthStore = typeof WidthStore

const store = new WidthStore(0)

interface IHandler extends IHandlerLow {
    breakpoints: Set<number>
    actWidth: number
}

export const setActWidth = (newWidth: number) => store.setState(newWidth)
