import React from 'react';
import { TWithStyles } from 'reactxx-typings'
import { platform } from 'reactxx-sheeter'

import { Consumer } from './provider'
import { parse, test } from './parser'


export const widthsPipe: TWithStyles.Pipe = (pipelineState, pipeId, next) => {
    const intervals: Record<string, [number, number]> = {}

    const render = () => {
        const { propsCode } = pipelineState
        if (propsCode.actWidths)
            propsCode.actWidths = getPropsCodeWidths(intervals, platform.actWidth())
        return next()
    }

    return () => {
        const { propsCode: { actWidths } } = pipelineState
        const needsConsumer = (pipelineState.options.nativeHasWidthRule && !window.isWeb) || actWidths
        if (!needsConsumer) return next()
        // parse and register breakpoints
        for (const p in actWidths) {
            const [from, to] = intervals[p] = parse(actWidths[p])
            platform.addBreakpoint(from)
            platform.addBreakpoint(to)
        }
        return <Consumer>{render}</Consumer>
    }
}

const getPropsCodeWidths = (intervals: Record<string, [number, number]>, width: number) => {
    const res: Record<string, boolean> = {}
    for (const p in intervals) res[p] = test(intervals[p], width)
    return res
}
