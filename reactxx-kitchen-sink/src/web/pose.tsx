import React from 'react'
import posed from "react-pose"
//import posedN from "react-native-pose"

import { getTypedEngine, getComponentCreator } from 'reactxx-styles'
import { TComponents, TTyped, T } from 'reactxx-typings'


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
    defaultPose: {
        root: {
            closed: {
                opacity: 0,
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
})

const getExample: TComponents.GetComponent<Shape> = useStyles => props => {

    const
        { getRootWebStyleProps, getWebStyleProps, classes, propsCode, propsCode: { children, $rootWebProps } } = useStyles(props),
        [active, setActive] = React.useState(false),
        boxEl = React.useRef(null),

        activating = React.useCallback((ev: React.MouseEvent) => {
            const
                { currentTarget: { clientHeight, clientWidth }, clientX, clientY } = ev,
                mw = Math.max(clientWidth - clientX, clientX),
                mh = Math.max(clientHeight - clientY, clientY),
                diameter = Math.sqrt(mh * mh + mw * mw) * 2,
                style = boxEl.current.style

            style.width = style.height = diameter + "px"
            style.top = clientY - diameter / 2 + "px"
            style.left = clientX - diameter / 2 + "px"

            setActive(true)
        }),

        activated = React.useCallback(() => setActive(false))

    return <div
        {...getRootWebStyleProps()}
        onMouseDown={activating}
        onMouseUp={activated}
    >
        HALLO RIPPLE
        <Box
            innerRef={el => (boxEl.current = el)}
            {...getWebStyleProps(classes.ripple)}
            pose={active ? "opened" : "closed"}
        />
    </div>

}

const Example = getComponentCreator(getExample, 'pose-example', config)()

export default Example
