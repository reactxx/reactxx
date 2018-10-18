import React from 'react';
import { TWithStyles } from 'reactxx-typings'
import { Consumer } from './provider'
import { parse } from './parser'

// platform dependent import
import { addBreakpoint } from 'reactxx-sheet-widths'


export const widthsPipe: TWithStyles.Pipe = (pipelineState, next) => {
    const pipeId = pipelineState.pipeCounter++
    const intervals: Record<string, [number, number]> = {}

    const render = (width: number) => {
        pipelineState.pipeStates[pipeId] = {
            codeProps: {
                sheetWidths: getPropsCodeWidths(intervals, width)
            }
        }
        return next()
    }

    return () => {
        const { pipeStates, props: { widths } } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        if (!widths || (window.isWeb && pipelineState.widths_noPropCode)) return next()
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
    for (const p in intervals) {
        const [from, to] = intervals[p]
        res[p] = width >= from && width < to
    }
    return res
}
