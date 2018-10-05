import { TWithStyles } from 'reactxx-typings'

import { TTransition } from '../d-index'

export class CodeComponentHandler {

    handlers: Record<string, ElementHandler> = {}
    //platformCompIdCounter = 0
    rendersCount: number

    finalizePropsCode(state: TWithStyles.PipelineState) {
        this.rendersCount = 0
        //this.elements = {}
    }
    // unique ID of platform component
    setTransition(deffered: TTransition.DefferedNative, usedPropsValues: TTransition.TValues, notAnimStyle: TTransition.TValues, platformCompProps) {
        const compId = 0//platformCompProps[TTransition.DefferedType.platformCompId] || (platformCompProps[TTransition.DefferedType.platformCompId] = (this.+).toString())
        // get or create CompAnimated object
        const { handlers } = this
        const comp = handlers[compId] || (handlers[compId] = new ElementHandler(this, compId))
        // animationStyle style
        const { $duration, $easing, usedProps } = deffered
        const animationStyle = comp.setTransition($duration, $easing, usedProps, usedPropsValues)
        // merge style with animation style
        platformCompProps.style = notAnimStyle && animationStyle ? { ...notAnimStyle, ...animationStyle } : notAnimStyle ? notAnimStyle : animationStyle
    }
}

class ElementHandler {

    constructor(private owner: CodeComponentHandler, private compId: number) { }

    setTransition($duration, $easing, props: Record<string, true>, values: TTransition.TValues) {
        checkValues(props, values)
        return null as TTransition.TValues
    }

}

let checkValues

const s = ''
