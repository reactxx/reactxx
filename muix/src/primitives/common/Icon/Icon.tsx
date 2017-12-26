import React from 'react'
import { icons } from 'muix-icons/index'
import ReactN from 'react-native'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { sheetCreator } from 'muix-styles'

import warning from 'warning' 

export type Colors = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';
export type ClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

export type Shape = Overwrite<Mui.DefaultEmptyShape, {
  common: Record<ClassKey, Mui.RNIconStyle>
  style: Mui.RNIconStyle
  props: {
    color?: Colors
    children?: icons
  }
  propsWeb: {}
  propsNative: {}
}>

export const iconColor = (color: string) => ({ native: { color }, web: { fill: color } } as Mui.RNIconStyle)
export const iconSize = (size: number) => ({ native: { fontSize: size }, web: { width: size, height: size } } as Mui.RNIconStyle)

export const sheet = sheetCreator<Shape>(({ palette }) => ({
  common: {
    root: iconSize(24),
    colorAccent: iconColor(palette.secondary.A200),
    colorAction: iconColor(palette.action.active),
    colorContrast: iconColor(palette.getContrastText(palette.primary[500])), 
    colorDisabled: iconColor(palette.action.disabled),
    colorError: iconColor(palette.error[500]),
    colorPrimary: iconColor(palette.primary[500]),
    colorInherit: {},
  },
  native: null,
  web: null
}))

export const getClasses = <T extends Mui.CSSPropertiesNative | string>({ classes, color = 'inherit', children, theme, innerRef, style, ...rest }: Mui.CodeProps<Shape>) => {
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string needed')
  return {
    name: childs[0] as icons,
    classes: {
      iconClass: [classes.root, classes[`color${capitalizeFirstLetter(color)}`]] as T[]
    },
    rest,
    style,
    innerRef
  }
}
