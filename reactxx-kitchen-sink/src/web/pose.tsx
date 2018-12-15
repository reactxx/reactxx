import React from 'react'
import posed from "react-pose"
//import posedN from "react-native-pose"

import { getTypedEngine, getComponentCreator } from 'reactxx-styles'
import { TComponents, TTyped, T } from 'reactxx-typings'
import { useActive } from 'reactxx-primitives'


interface Shape extends TTyped.ShapeAncestor {
    sheet: {
        root: T,
        ripple: T,
    },
    pose: {
        ripple: T,
    },
}

const { STYLE, WEB } = getTypedEngine<Shape>()

const config: TComponents.ComponentConfig<Shape> = {
    pose: {
        ripple: {
            closed: {
                opacity: 0.1,
                scale: 0,
                transition: {
                    scale: {
                        type: "keyframes",
                        duration: 250,
                        times: [0, 0.99, 1],
                        values: [1, 1, 0]
                    },
                    opacity: {
                        duration: 250
                        //ease: "linear"
                    }
                }
            },
            opened: {
                opacity: 0.2,
                scale: 1,
                transition: {
                    ease: "linear",
                    duration: 250
                }
            }
        }
    },
    sheet: {
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
        ripple: STYLE<T>(
            {
                position: 'absolute',
                top: 0,
                left: 0,

                backgroundColor: 'black',
            },
            WEB({
                display: 'block',
                borderRadius: '100%',
            })),

    }
}

const Box = posed.div({
    closed: {
        opacity: 0,
        scale: 0,
        transition: {
            opacity: {
                type: "keyframes",
                duration: 250,
                times: [0, 1],
                values: [0.2, 0]
            },
            scale: {
                type: "keyframes",
                duration: 250,
                times: [0, 0.99, 1],
                values: [1, 1, 0]
            },

        }
    },
    opened: {
        opacity: 0.2,
        scale: 1,
        transition: {
            duration: 250,
        }
    }
})

const getExample: TComponents.GetComponent<Shape> = useStyles => props => {

    const
        { getRootWebStyleProps, getWebStyleProps, classes, propsCode, propsCode: { children, $rootWebProps } } = useStyles(props),
        [activeState, activeStart, activeEnd] = useActive(),
        { isActive, event } = activeState,
        boxEl = React.useRef(null)

    if (isActive && event) {
        const
            { currentTarget: { clientHeight, clientWidth }, clientX, clientY } = event,
            mw = Math.max(clientWidth - clientX, clientX),
            mh = Math.max(clientHeight - clientY, clientY),
            diameter = Math.sqrt(mh * mh + mw * mw) * 2,
            style = boxEl.current.style

        style.width = style.height = diameter + "px"
        style.top = clientY - diameter / 2 + "px"
        style.left = clientX - diameter / 2 + "px"
    }

    return <div
        {...getRootWebStyleProps()}
        onMouseDown={activeStart}
        onMouseUp={activeEnd}
    >
        HALLO RIPPLE
        <Box
            innerRef={el => (boxEl.current = el)}
            {...getWebStyleProps(classes.ripple)}
            pose={isActive ? "opened" : "closed"}
        />
    </div>

}

const Example = getComponentCreator(getExample, 'pose-example', config)()

export default Example
