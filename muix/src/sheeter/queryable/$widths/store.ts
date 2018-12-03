import React from 'react'
import { platform } from 'reactxx-sheeter'
import { useForceUpdate } from '../../utils/use-force-update'
import { useUniqueId } from '../../utils/use-unique-id'

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

    const listenerRef = React.useRef(null)

    // get registered listener or create new listener (for registration)
    // created listener is registered in useLayoutEffect (when we already know when registration is necessary)
    const listener = listenerRef.current || { forceUpdate }

    // create new breakpoints-set in every render start
    // breakpoints-set is filled during render when:
    // - some breakpoint conditions found in used rulesets
    // - component call getWidthMap
    const breakpoints = listener.breakpoints = new Set()

    React.useLayoutEffect(() => { // call on every render
        if (breakpoints.size > 0) { // some breakpoints filled
            if (!listenerRef.current) // not aleady registered => register
                listenerRef.current = widthStore.register(uniqueId, listener)
            // for web: adjust media query for watched breakpoints
            if (window.isWeb)
                for (const br of breakpoints) platform.addBreakpoint(br)
        }
    })

    React.useLayoutEffect(() => { // call on unmount only
        return () => widthStore.register(uniqueId, null) // unmount => unregister
    }, [])

    const actWidth = widthStore.actWidth

    const getWidthMap = (mapBreakpoints?: number[]) => {
        if (window.__TRACE__) {
            let last = 0
            for (const b of mapBreakpoints) {
                if (b <= last) throw 'getWidthMap argument error: array of increasing numbers (greater than zero) expected'
                last = b + 1
            }
        }
        // add breakpoints for change detection
        for (const b of mapBreakpoints) breakpoints.add(b)

        // get map (just single item is true)
        let found = mapBreakpoints.findIndex(b => actWidth < b)
        if (found < 0) found = mapBreakpoints.length
        const res: boolean[] = []
        res[found] = true
        return res
    }
    return { getWidthMap, breakpoints, actWidth }
}

export class WidthStore {

    actWidth = platform.actWidth()
    listeners: Record<number, IListener> = {} // width change listeners

    // width change
    setWidth = (newWidth: number) => {
        if (this.actWidth === newWidth) return
        const oldWidth = this.actWidth
        this.actWidth = newWidth
        // notify listeners when some of its breakpoint changed 
        for (const p in this.listeners)
            this.refreshListener(this.listeners[p], oldWidth, newWidth)
    }

    refreshListener(listener: IListener, oldWidth: number, newWidth: number) {
        let theSame = true
        for (const br of listener.breakpoints)
            theSame = theSame && (newWidth >= br && oldWidth >= br || newWidth < br && oldWidth < br)
        if (theSame) return
        listener.forceUpdate(null)
    }

    register(id: number, listener) {
        if (listener) return this.listeners[id] = listener // REGISTER
        else delete this.listeners[id] // UNREGISTER
    }

}

interface IListener {
    breakpoints?: Set<number>
    forceUpdate: (state: null) => void
}

export const setActWidth = (newWidth: number) => platform._sheeter.widthsStore.setWidth(newWidth)
