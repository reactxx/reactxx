import React from 'react'
import { platform } from 'reactxx-styles'
// import { useForceUpdate } from '../../hooks/use-force-update'
// import { useUniqueId } from '../../hooks/use-unique-id'

// export const useWidths = () => {   const forceUpdate = useForceUpdate()
//     const uniqueId = useUniqueId(platform._useSheeter)
//     return useWidthsLow(uniqueId, forceUpdate)
// }

export const useWidths = (
    uniqueId: number,
    forceUpdate: (p?) => void,
) => {
    const widthStore = platform._styles.widthsStore

    const listenerRef = React.useRef(null)

    // get registered listener or create new listener (for registration)
    // created listener is registered in useLayoutEffect (when we already know when registration is necessary)
    const listener = listenerRef.current || { forceUpdate, breakpoints: new Set() }

    // breakpoints-set is filled during render:
    // - when some breakpoint conditions found in rulesets
    // - when component calls getWidthMap
    const breakpoints = listener.breakpoints

    React.useLayoutEffect(() => { // call on every render
        if (breakpoints.size > 0) { // some breakpoints filled
            if (!listenerRef.current) // not aleady registered => register
                listenerRef.current = widthStore.register(uniqueId, listener)
            // for web: adjust media query for watching breakpoints
            if (window.isWeb)
                for (const br of breakpoints) platform.watchBreakpointChange(br)
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

        //**WIDHT**
        let found = mapBreakpoints.findIndex(b => actWidth <= b)
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
            //**WIDHT**
            theSame = theSame && (newWidth > br && oldWidth > br || newWidth <= br && oldWidth <= br)
        if (theSame) return
        // const os = widthState(oldWidth, listener.breakpoints), ns = widthState(newWidth, listener.breakpoints)
        // if (os === ns) return
        listener.forceUpdate(null)
    }


    register(id: number, listener) {
        if (listener) return this.listeners[id] = listener // REGISTER
        else delete this.listeners[id] // UNREGISTER
    }

}
// const widthState = (actWidth: number, breakpoints: Set<number>) => {
//     let minDiff = 1000000, minValue = -1
//     breakpoints.forEach(v => {
//         //**WIDHT**
//         if (actWidth > v) return
//         const mv = v - actWidth
//         if (mv >= minDiff) return
//         minDiff = mv, minValue = v
//     })
//     return minValue
// }

interface IListener {
    breakpoints?: Set<number>
    forceUpdate: (state: null) => void
}

export const setActWidth = (newWidth: number) => platform._styles.widthsStore.setWidth(newWidth)
