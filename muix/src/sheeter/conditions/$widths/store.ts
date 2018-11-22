import React from 'react'
import { platform } from 'reactxx-sheeter'

// called first (in useReactxx hook)
export const useWidthsLow = (
    uniqueId: number,
    forceUpdate: (p) => void,
) => {
    let handler = widthStore.handlers[uniqueId]

    const inStore = !!handler
    if (!inStore) handler = { forceUpdate }

    const hbreakpoints = handler.breakpoints = new Set()

    const actWidth = platform.actWidth()

    React.useEffect(() => {
        if (hbreakpoints.size > 0) {
            if (!inStore) widthStore.handlers[uniqueId] = handler
            // for web: adjust media query for watched breakpoints
            hbreakpoints.forEach(br => platform.addBreakpoint(br))
        }
        return () => delete widthStore.handlers[uniqueId] // unmount => remove handler
    })

    const getWidthMap = (breakpoints?: number[]) => {
        if (window.__TRACE__) {
            let last = 0
            breakpoints.forEach(b => {
                if (b <= last) throw 'useWidths argument error: array of increasing numbers (greater than zero) expected'
                last = b + 1
            })
        }
        // add breakpoints for change detection
        breakpoints.forEach(b => hbreakpoints.add(b))

        // just single array item is true
        let found = breakpoints.findIndex(b => actWidth < b)
        if (found < 0) found = breakpoints.length
        const res: boolean[] = []
        res[found] = true
        return res

    }
    return { getWidthMap, breakpoints: hbreakpoints, actWidth }
}

// called in component code (after useWidthsLow call)

export class WidthStore  {

    state = platform.actWidth()

    setState = (newState: number) => {
        const oldState = this.state
        this.state = newState
        for (const p in this.handlers) this.refreshHandler(this.handlers[p], oldState, newState)
    }

    handlers: Record<number, IHandler> = {}

    refreshHandler(handler: IHandler, oldWidth: number, newWidth: number) {
        if (oldWidth === newWidth) return
        let noChange = true
        handler.breakpoints.forEach(br => noChange = noChange &&
            (newWidth >= br && oldWidth >= br || newWidth < br && oldWidth < br))
        if (noChange) return
        handler.forceUpdate(null)
    }

}

// global store for watching width change
const widthStore = new WidthStore()

interface IHandler {
    breakpoints?: Set<number>
    forceUpdate: (state: null) => void
}

export const setActWidth = (newWidth: number) => widthStore.setState(newWidth)
