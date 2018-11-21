import React from 'react'
import { StoreLow, IHandlerLow, useStoreLow } from 'reactxx-use-store'

export const useWidthsLow = (allRulesetWidths: Set<number>) => {
    const handler = useStoreLow(store, null)
    handler.breakpoints = allRulesetWidths
    handler.actWidth = store.state
    React.useEffect(() => {
        allRulesetWidths.forEach(br => {/*register br*/ })
    })
    return handler
}

// called in component code, after useWidthsLow call
export const useWidths = (handler: IHandler, breakpoints?: number[]) => {
    if (window.__TRACE__) {
        let last = 0
        breakpoints.forEach(b => {
            if (b <= last) throw 'useWidths argument error: array of increasing numbers (greater than zero) expected'
            last = b + 1
        })
    }
    breakpoints.forEach(b => handler.breakpoints.add(b))

    // just single array item is true
    let found = breakpoints.findIndex(b => handler.actWidth < b)
    if (found<0) found = breakpoints.length
    const res: boolean[] = []
    res[found] = true
    return res

}

class WidthStore extends StoreLow<number, IHandler> {

    constructor(state: number) { super(state) }

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

    // called first. allRulesetWidths could be modified in useWidths
}

const store = new WidthStore(0)

interface IHandler extends IHandlerLow {
    breakpoints: Set<number>
    actWidth: number
}

export const devSetActWidth = (newWidth:number) => store.setState(newWidth)
