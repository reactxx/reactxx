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

    // handler is registered in widthStore in useLayoutEffect: in useLayoutEffect we already known, if some breakpoints exist
    const listener = listenerRef.current || { forceUpdate }
    const breakpoints = listener.breakpoints = new Set() // always new breakpoints for every render

    React.useLayoutEffect(() => { // call on every render
        if (breakpoints.size > 0) { // some breakpoints found (in rulesets or as a result of getWidthMap call)
            if (!listenerRef.current) // not aleady registered => register
                listenerRef.current = widthStore.register(uniqueId, listener)
            // for web: adjust media query for watched breakpoints
            breakpoints.forEach(br => platform.addBreakpoint(br))
        }
    })

    React.useLayoutEffect(() => { // call on unmount only
        return () => widthStore.register(uniqueId) // unmount => unregister
    }, [])

    const actWidth = widthStore.actWidth

    const getWidthMap = (mapBreakpoints?: number[]) => {
        if (window.__TRACE__) {
            let last = 0
            mapBreakpoints.forEach(b => {
                if (b <= last) throw 'useWidths argument error: array of increasing numbers (greater than zero) expected'
                last = b + 1
            })
        }
        // add breakpoints for change detection
        mapBreakpoints.forEach(b => breakpoints.add(b))

        // get map (just single array item is true)
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
    listeners: Record<number, IListener> = {} // change width listeners

    // width chan
    setWidth = (newWidth: number) => {
        if (this.actWidth === newWidth) return
        const oldWidth = this.actWidth
        this.actWidth = newWidth
        for (const p in this.listeners) this.refreshHandler(this.listeners[p], oldWidth, newWidth)
    }

    refreshHandler(listener: IListener, oldWidth: number, newWidth: number) {
        let noChange = true
        listener.breakpoints.forEach(br => noChange = noChange &&
            (newWidth >= br && oldWidth >= br || newWidth < br && oldWidth < br))
        if (noChange) return
        listener.forceUpdate(null)
    }

    register(id: number, listener?) {
        if (listener) return this.listeners[id] = listener
        else delete this.listeners[id]
    }

}

// global store for watching width change
//const widthStore = new WidthStore()

interface IListener {
    breakpoints?: Set<number>
    forceUpdate: (state: null) => void
}

export const setActWidth = (newWidth: number) => platform._sheeter.widthsStore.setWidth(newWidth)
