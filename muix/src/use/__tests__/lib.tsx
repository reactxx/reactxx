/** @jsx platform.createElement */

import React from 'react'
import { platform } from "reactxx-sheeter"

import { TSheeter, TWithStyles, TComponents } from 'reactxx-typings'
import { useSheeter } from "reactxx-use"

export interface Shape extends TSheeter.ShapeAncestor {
    rulesets: {
      root: 'Text'
    },
    props: {
      p1: string
    },
    theme: Theme
  }

  export interface Theme {
    primaryColor: string
    p1Prop: string
}
  
  export const compCreator = (
    config: TWithStyles.ComponentConfig<Shape>,
    configOverride: TWithStyles.ComponentConfigOverride<Shape>,
    displayName?: 'Comp'
  ) => {
    const res: TComponents.SFC<Shape> = props => {
      try {
        const { toClassNames, propsCode, classes, classNameX, styleX
        } = useSheeter(props, config, displayName, configOverride)
        
        const renderCount = React.useRef(0)
        renderCount.current++
        const root = toClassNames(classes.root, classNameX)
        return <div {...propsCode} classNameX={root} styleX={styleX as any}>{renderCount.current}</div>
      } catch {
        return <div>ERROR</div>
      }
    }
    res.displayName = displayName
    res['$c$'] = true
    return res
  }

