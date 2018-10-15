import React from 'react';
import { TWithStyles, TComponents } from 'reactxx-typings'

export const widthsPipe: TWithStyles.Pipe = (pipelineState, next) => {
    const pipeId = pipelineState.pipeCounter++
    const render = (width: number) => {
        const widthName: string = ''
        pipelineState.pipeStates[pipeId] = {
            codeProps: {
                breakpoints: {
                    [widthName]: true
                }
            },
            sheetQuery: {
                $sheetSwitch: {
                    [widthName]: true
                }
            }
        }
        return next()
    }
    return () => {
        const { pipeStates, props: { breakpoints } } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        if (!breakpoints) return next()
        return <div>{render}</div> // TODO width consumer: 
    }
}