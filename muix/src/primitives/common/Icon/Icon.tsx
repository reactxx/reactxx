import React from 'react'
import ReactN from 'react-native'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { withStyles, sheetCreator } from 'muix-styles'
import { IconX } from 'muix-primitives'

import warning from 'warning'

export const iconColor = (color: string) => ({ $native: { color }, $web: { fill: color } } as Muix.TextStyleCommon)
export const iconSize = (size: number) => ({ $native: { fontSize: size }, $web: { width: size, height: size } } as Muix.TextStyleCommon)

export const sheet = sheetCreator<MuixIcon.Shape>(({ palette }) => ({
  root: iconSize(24),
  colorAccent: iconColor(palette.secondary.A200),
  colorAction: iconColor(palette.action.active),
  colorContrast: iconColor(palette.getContrastText(palette.primary[500])),
  colorDisabled: iconColor(palette.action.disabled),
  colorError: iconColor(palette.error[500]),
  colorPrimary: iconColor(palette.primary[500]),
  colorInherit: {},
}))

const icon: Muix.CodeSFC<MuixIcon.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, style, children, color = 'inherit', ...rest } = props
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string expected')
  const data = childs[0] as MuixIcons
  const iconClass = getStyleWithSideEffect(classes.root, classes[`color${capitalizeFirstLetter(color)}`])
  return <IconX className={iconClass} style={style} $native={rest as any} $web={rest as any} data={data}/>
}

const Icon = withStyles<MuixIcon.Shape>(sheet, { name: 'MuiIcon' })(icon)

export default Icon

//export const getClasses = <T extends Muix.CSSPropertiesNative | string>({ classes, color = 'inherit', children, theme, innerRef, style, ...rest }: Muix.CodeProps<MuixIcon.Shape>) => {
//  const childs = React.Children.toArray(children)
//  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string expected')
//  return {
//    name: childs[0] as MuixIcons,
//    classes: {
//      iconClass: [classes.root, classes[`color${capitalizeFirstLetter(color)}`]] as T[]
//    },
//    rest,
//    style,
//    innerRef
//  }
//}
