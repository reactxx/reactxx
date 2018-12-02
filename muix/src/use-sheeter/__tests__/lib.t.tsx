/** @jsx platform.createElement */

import React from 'react'
import { platform } from "reactxx-sheeter"

import { TTyped } from 'reactxx-typings'
import { useSheeter, TUseSheeter, TComponents } from "reactxx-use-sheeter"

export interface Shape extends TTyped.ShapeAncestor { 
    sheet: {
      root: 'T'
    },
    className: 'T',
    props: {
      p1?: string
    },
    theme: Theme
  }

  export interface Theme {
    primaryColor: string
    p1Prop: string
}
  
  export const compCreator = (
    config: TUseSheeter.AuthorConfig<Shape>,
    userConfig?: TUseSheeter.UserConfig<Shape>,
    displayName?: 'Comp'
  ) => {
    const res: TComponents.SFC<Shape> = props => {
      try {
        const { toClassNames, propsCode, classes, classNameX, styleX
        } = useSheeter<Shape>(props, config, displayName, userConfig)
        
        const renderCount = React.useRef(0)
        renderCount.current++
        const root = toClassNames(classes.root as any/*TODO*/, classNameX)
        return <div {...propsCode} classNameX={root} styleX={styleX as any}>{renderCount.current}</div>
      } catch {
        return <div>ERROR</div>
      }
    }
    res.displayName = displayName
    res['$c$'] = true
    return res
  }

