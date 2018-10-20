import React from 'react';
import { TWithStyles } from 'reactxx-typings'
import { Consumer } from './provider'
import { parse, test } from './parser'

// platform dependent import
import { addBreakpoint } from 'reactxx-sheet-widths'


export const widthsPipe: TWithStyles.Pipe = (pipelineState, next) => {
    const pipeId = pipelineState.pipeCounter++
    const intervals: Record<string, [number, number]> = {}

    const render = (width: number) => {
        if (pipelineState.props.widths) pipelineState.pipeStates[pipeId] = {
            codeProps: {
                isWidths: getPropsCodeWidths(intervals, width)
            }
        }
        return next()
    }

    return () => {
        const { pipeStates, props: { widths } } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        const needsConsumer = (pipelineState.withWidthsRuleset && !window.isWeb) || widths
        if (!needsConsumer) return next()
        // parse and register breakpoints
        for (const p in widths) {
            const [from, to] = intervals[p] = parse(p)
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
