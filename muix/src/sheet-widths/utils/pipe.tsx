import React from 'react';
import { TWithStyles } from 'reactxx-typings'
import { Consumer } from './provider'
import { parse, test } from './parser'

import { platform } from '../index'

export const widthsPipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
    const intervals: Record<string, [number, number]> = {}

    const render = (width: number) => {
        if (pipelineState.propsCode.actWidths)
            pipelineState.propsCode.actWidths = getPropsCodeWidths(intervals, platform.actWidth())
        return next()
    }

    return () => {
        const { pipeStates, propsCode: { actWidths } } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        const needsConsumer = (pipelineState.nativeHasWidthRule && !window.isWeb) || actWidths
        if (!needsConsumer) return next()
        // parse and register breakpoints
        for (const p in actWidths) {
            const [from, to] = intervals[p] = parse(actWidths[p])
            platform.addBreakpoint(from)
            platform.addBreakpoint(to)
        }
        return <Consumer>{render}</Consumer> // TODO width consumer: 
    }
}

const getPropsCodeWidths = (intervals: Record<string, [number, number]>, width: number) => {
    const res: Record<string, boolean> = {}
    for (const p in intervals) res[p] = test(intervals[p], width)
    return res
}
