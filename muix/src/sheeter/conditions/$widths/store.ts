import React from 'react'
import { platform } from 'reactxx-sheeter'
import {useForceUpdate} from '../../utils/use-force-update'
import {useUniqueId} from '../../utils/use-unique-id'

export const useWidths = () => {
    const forceUpdate = useForceUpdate()
    const uniqueId = useUniqueId(platform._withStyles)
    return useWidthsLow(uniqueId, forceUpdate)
}

export const useWidthsLow = (
    uniqueId: number,
    forceUpdate: (p?) => void,
) => {
    const widthStore = platform._sheeter.widthsStore

    const handlerRef = React.useRef(null)
    const handler = handlerRef.current || { forceUpdate }
    const hbreakpoints = handler.breakpoints = new Set()
    const actWidth = widthStore.state
    
    React.useLayoutEffect(() => { // call on every render
        if (hbreakpoints.size > 0) { // some breakpoints found (or calling getWidthMap or in styles)
            if (!handlerRef.current)
                handlerRef.current = widthStore.handlers[uniqueId] = handler
            // for web: adjust media query for watched breakpoints
            hbreakpoints.forEach(br => platform.addBreakpoint(br))
        }
    })

    React.useLayoutEffect(() => { // call on unmount only
        return () => delete widthStore.handlers[uniqueId] // unmount => remove handler
    }, [])

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

        // get map (just single array item is true)
        let found = breakpoints.findIndex(b => actWidth < b)
        if (found < 0) found = breakpoints.length
        const res: boolean[] = []
        res[found] = true
        return res

    }
    return { getWidthMap, breakpoints: hbreakpoints, actWidth }
}

export class WidthStore {

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
//const widthStore = new WidthStore()

interface IHandler {
    breakpoints?: Set<number>
    forceUpdate: (state: null) => void
}

export const setActWidth = (newWidth: number) => platform._sheeter.widthsStore.setState(newWidth)
