import React from 'react'
import ReactN from 'react-native'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { withStyles, sheetCreator } from 'muix-styles'
import { IconX } from 'muix-primitives'

import warning from 'warning'

export const sheet = sheetCreator<MuixIcon.Shape>(({ palette }) => ({
  root: { fontSize: 24 },
  style: {},
  colorAccent: { color: palette.secondary.A200 },
  colorAction: { color: palette.action.active },
  colorContrast: { color: palette.getContrastText(palette.primary[500]) },
  colorDisabled: { color: palette.action.disabled },
  colorError: { color: palette.error[500] },
  colorPrimary: { color: palette.primary[500] },
  colorInherit: {},
}))

const icon: Muix.CodeSFC<MuixIcon.Shape> = props => {
  const { classes, theme, flip, getStyleWithSideEffect, style, children, color = 'inherit', ...rest } = props
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string expected')
  const data = childs[0] as MuixIcons
  const iconClass = getStyleWithSideEffect(classes.root, classes[`color${capitalizeFirstLetter(color)}`], classes.style)
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
