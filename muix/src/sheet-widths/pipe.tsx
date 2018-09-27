import React from 'react';
import { TWithStyles, TComponents } from 'reactxx-typings'

export const widthsPipe: TWithStyles.Pipe = (state, next) => {
    const pipeId = state.pipeCounter++
    const render = (width: number) => {
        const widthName: string = ''
        state.pipeStates[pipeId] = {
            codeProps: {
                breakpoints: {
                    [widthName]: true
                }
            },
            flags: { [widthName]: true }
        }
        return next()
    }
    return () => {
        const { pipeStates } = state
        // UNDO
        delete pipeStates[pipeId]
        if (!state.props.breakpoints) return next()
        return <div>{render}</div>
    }
}