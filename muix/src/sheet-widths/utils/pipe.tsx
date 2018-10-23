import React from 'react';
import { TWithStyles } from 'reactxx-typings'
import { Consumer } from './provider'
import { parse, test } from './parser'

import { platform } from 'reactxx-sheeter'
// platform dependent import
import { PlatformWidth } from 'reactxx-sheet-widths'

export const widthsPipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
    const intervals: Record<string, [number, number]> = {}
    const addBreakpoint = (platform as PlatformWidth).addBreakpoint

    const render = (width: number) => {
        if (pipelineState.propsCode.widthsDef)
            pipelineState.propsCode.actWidths = getPropsCodeWidths(intervals, (platform as PlatformWidth).actWidth())
        return next()
    }

    return () => {
        const { pipeStates, propsCode: { widthsDef } } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        const needsConsumer = (pipelineState.nativeHasWidthRule && !window.isWeb) || widthsDef
        if (!needsConsumer) return next()
        // parse and register breakpoints
        for (const p in widthsDef) {
            const [from, to] = intervals[p] = parse(widthsDef[p])
            addBreakpoint(from)
            addBreakpoint(to)
        }
        return <Consumer>{render}</Consumer> // TODO width consumer: 
    }
}

const getPropsCodeWidths = (intervals: Record<string, [number, number]>, width: number) => {
    const res: Record<string, boolean> = {}
    for (const p in intervals) res[p] = test(intervals[p], width)
    return res
}
