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
            //sheetSwitch: { [widthName]: true }
        }
        return next()
    }
    return () => {
        const { pipeStates } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        if (!pipelineState.props.breakpoints) return next()
        return <div>{render}</div> // TODO width consumer: 
    }
}