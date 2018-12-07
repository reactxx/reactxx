/** @jsx platform.createElement */

import React from 'react'
import ReactN from 'react-native'
import { platform } from "reactxx-sheeter"

import { TTyped } from 'reactxx-typings'
import { useSheeter, TUseSheeter, TComponents } from "reactxx-use-sheeter"

export interface Shape extends TTyped.ShapeAncestor {
  root: {
    web: React.AnchorHTMLAttributes<HTMLAnchorElement>
    native: ReactN.TextProperties
  }
  // sheet: {
  //   root: 'T'
  // },
  //className: 'T',
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
      const { toClassNames, propsCode, classes, css, styles
      } = useSheeter<Shape>(props, config, displayName, userConfig)

      const renderCount = React.useRef(0)
      renderCount.current++
      const root = toClassNames(classes.root as any/*TODO*/, css)
      return <div {...propsCode} css={root} styles={styles as any}>{renderCount.current}</div>
    } catch {
      return <div>ERROR</div>
    }
  }
  res.displayName = displayName
  res['$c$'] = true
  return res
}

