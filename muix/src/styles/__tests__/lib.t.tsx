

import React from 'react'
import ReactN from 'react-native'

import { TTyped, T, TComponents } from 'reactxx-typings'
import { useStyles, getComponent } from "reactxx-styles"

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
  authorConfig: TComponents.ComponentConfig<Shape>,
  userConfig?: TComponents.ComponentConfig<Shape>,
  displayName?: 'Comp'
) => getComponent(config => props => {
  try {
    const { getRootWebStyleProps, propsCode: { p1 }
    } = useStyles(props, config)

    const renderCount = React.useRef(0)
    renderCount.current++

    return <div {...getRootWebStyleProps()} >{`${p1 ? p1 + ': ' : ''}${renderCount.current}`}</div>
  } catch {
    return <div>ERROR</div>
  }
}, [authorConfig, userConfig, {displayName}]) 
