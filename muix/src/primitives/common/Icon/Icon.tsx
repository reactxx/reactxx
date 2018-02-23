import React from 'react'
import ReactN from 'react-native'

import { capitalize } from 'material-ui/utils/helpers'
import { withStyles, sheetCreator } from 'muix-styles'
import { IconX } from 'muix-primitives'

import warning from 'warning'

export const sheet = sheetCreator<MuixIcon.Shape>(({ palette }) => ({
  root: {
    fontSize: 24,
    $web: {
      userSelect: 'none',
    }
  },
  colorPrimary: {
    color: palette.primary.main,
  },
  colorSecondary: {
    color: palette.secondary.main,
  },
  colorAction: {
    color: palette.action.active,
  },
  colorDisabled: {
    color: palette.action.disabled,
  },
  colorError: {
    color: palette.error.main,
  },
  fontSize: {
    width: 16,
    height: 16,
  },
}))

const icon: ReactXX.CodeSFC<MuixIcon.Shape> = props => {
  const { classes, theme, mergeRulesetWithOverrides, style, children, color = 'inherit', className, animations, ...rest } = props
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string expected')
  const data = childs[0] as MDI
  const iconClass = mergeRulesetWithOverrides(classes.root, classes[`color${capitalize(color)}`], className)
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
