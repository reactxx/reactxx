import React from "react"
import posed from "react-pose"
import warning from "warning"

import { TComponents, TTyped, T } from 'reactxx-typings'
import { getTypedEngine, getComponent } from 'reactxx-styles'

import { ActiveState } from './use-active'

interface Shape extends TTyped.ShapeAncestor {
  sheet: {
    root: T,
  },
  props: {
    activeState: ActiveState
  }
}

const { STYLE, WEB } = getTypedEngine<Shape>()

const config: TComponents.ComponentConfig<Shape> = {
  displayName: 'reactxx-ripple',
  $sheet: {
    root: STYLE<T>(
      {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'black',
      },
      WEB({
        display: 'block',
        borderRadius: '100%',
      })),
  },
  // $pose: {
  //   Root: {
  //     closed: {
  //       opacity: 0,
  //       scale: 0,
  //       transition: {
  //         scale: {
  //           type: "keyframes",
  //           duration: 250,
  //           times: [0, 0.99, 1],
  //           values: [1, 1, 0]
  //         },
  //         opacity: {
  //           duration: 250
  //         }
  //       }
  //     },
  //     opened: {
  //       opacity: 0.2,
  //       scale: 1,
  //       transition: {
  //         duration: 250
  //       }
  //     }
  //   }
  // }
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
      }
    }
  },
  opened: {
    opacity: 0.2,
    scale: 1,
    transition: {
      duration: 250
    }
  }
})

const ripple: TComponents.GetComponent<Shape> = useStyles => props => {

  const
    { getRootWebStyleProps, propsCode: { $rootWebProps, activeState: { isActive, event } } } = useStyles(props),
    poseElement = React.useRef(null)

  React.useMemo(() => {
    if (!isActive) return
    const
      { currentTarget, currentTarget: { clientHeight, clientWidth }, clientX, clientY } = event,
      mw = Math.max(clientWidth - clientX, clientX),
      mh = Math.max(clientHeight - clientY, clientY),
      diameter = Math.sqrt(mh * mh + mw * mw) * 2

    if (window.__TRACE__) {
      const pstyle = getComputedStyle(currentTarget)
      warning(pstyle.position==='relative' && pstyle.overflow==='hidden', `Ripple owner must have position==='relative' and pstyle.overflow==='hidden'`)
    }

    const style = poseElement.current.style
    style.width = style.height = diameter + "px"
    style.top = clientY - diameter / 2 + "px"
    style.left = clientX - diameter / 2 + "px"

  }, [isActive])

  return <Box
    innerRef={el => (poseElement.current = el)}
    {...getRootWebStyleProps()}
    {...$rootWebProps || null}
    pose={isActive ? "opened" : "closed"}
  />
}

const Ripple = getComponent(ripple, config)

export default Ripple
