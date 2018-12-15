import React from 'react'
import posed from "react-pose"
//import posedN from "react-native-pose"

import { getTypedEngine, getComponentCreator } from 'reactxx-styles'
import { TComponents, TTyped, T } from 'reactxx-typings'
import { useActive, Ripple } from 'reactxx-primitives'


interface Shape extends TTyped.ShapeAncestor {
    sheet: {
        root: T,
    },
}

const { STYLE, WEB } = getTypedEngine<Shape>()

const config: TComponents.ComponentConfig<Shape> = {
    displayName: 'pose-example',
    $sheet: {
        root: STYLE<T>(
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',

                width: 200,
                height: 60,
                backgroundColor: 'red',
                color: 'white',
                borderRadius: 10,
            },
            WEB({
                userSelect: 'none',
            })),
    }
}

const getExample: TComponents.GetComponent<Shape> = useStyles => props => {

    const
        { getRootWebStyleProps } = useStyles(props),
        [activeState, activeStart, activeEnd] = useActive()

    return <div
        {...getRootWebStyleProps()}
        onMouseDown={activeStart}
        onMouseUp={activeEnd}
    >   
        HALLO RIPPLE
        <Ripple activeState={activeState} />
    </div>

}

const Example = getComponentCreator(getExample, config)()

export default Example
