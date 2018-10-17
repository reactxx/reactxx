import React from 'react';
import { TWithStyles, TComponents } from 'reactxx-typings'

export const widthsPipe: TWithStyles.Pipe = (pipelineState, next) => {
    const pipeId = pipelineState.pipeCounter++
    const render = (width: number) => {
        const widthName: string = ''
        pipelineState.pipeStates[pipeId] = {
            codeProps: {
                sheetWidths: {
                    [widthName]: true
                }
            },
            innerState: {
                $widths: {
                    [widthName]: true
                }
            }
        }
        return next()
    }
    return () => {
        const { pipeStates, props: { sheetWidths } } = pipelineState
        // UNDO
        delete pipeStates[pipeId]
        if (!sheetWidths || (window.isWeb && !pipelineState.withSheetWidthsProp)) return next()
        return <div>{render}</div> // TODO width consumer: 
    }
}