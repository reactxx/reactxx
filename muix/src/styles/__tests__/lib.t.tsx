

import React from 'react'
import ReactN from 'react-native'
import { platform } from "reactxx-styles"

import { TTyped, T, TComponents } from 'reactxx-typings'
import { useSheeter } from "reactxx-styles"

export interface Shape extends TTyped.ShapeAncestor {
  //rootStyle: T
  rootWebProps: React.AnchorHTMLAttributes<HTMLAnchorElement>
  rootNativeProps: ReactN.TextProperties
  sheet: {
    root: T
  }
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
  config: TComponents.AuthorConfig<Shape>,
  userConfig?: TComponents.UserConfig<Shape>,
  displayName?: 'Comp'
) => {
  const res: TComponents.SFC<Shape> = props => {
    try {
      const { styleRootWeb, propsCode: { p1 }, classes, classNames, styles
      } = useSheeter<Shape>(props, config, displayName, userConfig)

      const renderCount = React.useRef(0)
      renderCount.current++

      return <div {...styleRootWeb()} >{`${p1 ? p1 + ': ' : ''}${renderCount.current}`}</div>
    } catch {
      return <div>ERROR</div>
    }
  }
  res.displayName = displayName
  res['$c$'] = true
  return res
}

