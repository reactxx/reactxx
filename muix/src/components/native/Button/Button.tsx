import React from 'react'
import ReactN from 'react-native'

import { fade } from 'material-ui/styles/colorManipulator'
import { capitalize } from 'material-ui/utils/helpers';

import { withStyles, toPlatformRuleSet, sheetCreator } from 'muix-styles'
//import { withStyles, toPlatformRuleSet, sheetCreator } from 'muix-prim5s'

import { Text } from 'muix-primitives'

import { RippleEffect } from '../ButtonBase/ButtonBase'

//export type ButtonShape = Shape
const getTextIconColor = (color: string) => ({
  MuiText: { root: { color } },
  MuiIcon: { root: { color } },
} as Prim5s.SheetsX)


const sheets = (isLeft?: boolean) => sheetCreator<MuixButton.Shape>(({ typographyX: typoX, palette, spacing, shadowsNew }) => ({

  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: spacing.unit * 11,
    minHeight: 36,
    paddingTop: spacing.unit,
    paddingBottom: spacing.unit,
    paddingLeft: spacing.unit * 2,
    paddingRight: spacing.unit * 2,
    borderRadius: 2,
    color: palette.text.primary,
    $childCascading: {
      MuiIcon: { root: { lineHeight: 1.4 * 16, fontSize: 24, ...(isLeft === true ? { marginRight: spacing.unit } : (isLeft === false ? { marginLeft: spacing.unit } : {})) } },
      MuiText: { root: { ...typoX.button, color: palette.text.primary, } },
    },
  },

  disabled: {
    $childCascading: getTextIconColor(palette.action.disabled)
  },

  flat: {
    $cascading: {
      ripple: { backgroundColor: palette.grey[500], opacity: 0.8 },
    }
  },
  flatPrimary: {
    $cascading: {
      ripple: { backgroundColor: fade(palette.primary[500], 0.4), opacity: 0.8 },
    },
    $childCascading: getTextIconColor(palette.primary[500])
  },
  flatSecondary: {
    $cascading: {
      ripple: { backgroundColor: fade(palette.secondary.light, 0.4), opacity: 0.8 },
    },
    $childCascading: getTextIconColor(palette.secondary.light)
  },

  raised: {
    backgroundColor: palette.grey[300],
    ...shadowsNew[2],
    $cascading: {
      active: shadowsNew[8],
    }
  },
  raisedPrimary: {
    backgroundColor: palette.primary.main,
    $childCascading: getTextIconColor(palette.primary.contrastText)
  },
  raisedSecondary: {
    backgroundColor: palette.secondary.main,
    $childCascading: getTextIconColor(palette.secondary.contrastText)
  },
  raisedDisable: {
    ...shadowsNew[0],
    backgroundColor: palette.action.disabledBackground,
    //$childOverrides: getTextIconColor(palette.action.disabled),
    $childCascading: getTextIconColor('gray'),
  },
  raisedContrast: {
    $childOverrides: getTextIconColor(palette.getContrastText(palette.primary[500]))
  },

  fab: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    ...shadowsNew[6],
    $cascading: {
      active: shadowsNew[12],
    }
  },

  mini: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  ripple: {
    backgroundColor: palette.common.white, opacity: 0.35,
  },
  colorInherit: {},
  label: {},
  active: {},
  keyboardFocused: {}
}))


const button: Prim5s.CodeSFCNative<MuixButton.Shape> = (props, context) => {


  var x = props.mini
  const { children, classes, color = 'default', variant, mini, mergeRulesetWithCascading, className, animations, ...rest } = props
  const { disabled } = rest //disabled must be propagated to ButtonBaseLow

  const fab = variant == 'fab'
  const raised = variant == 'raised'

  const isFlat = !raised && !fab
  const Color = capitalize(color)

  const viewStyle = mergeRulesetWithCascading(
    classes.root,
    !isFlat && classes.raised,
    isFlat && classes.flat,
    fab && classes.fab,
    fab && mini && classes.mini,
    isFlat && color === 'primary' && classes.flatPrimary,
    isFlat && color === 'secondary' && classes.flatSecondary,
    !isFlat && color === 'primary' && classes.raisedPrimary,
    !isFlat && color === 'secondary' && classes.raisedSecondary,

    !isFlat && disabled && classes.raisedDisable,
    isFlat && disabled && classes.disabled,

    className,
  ) as ReactN.ViewStyle

  //console.log('### viewStyle: ', viewStyle)

  const rippleStyle = mergeRulesetWithCascading(classes.ripple) as ReactN.ViewStyle
  const activeStyle = mergeRulesetWithCascading(!disabled && classes.active) as ReactN.ViewStyle

  const childs = React.Children.toArray(children).map((ch, idx) => typeof ch === 'string' || typeof ch === 'number' ? <Text key={idx}>{ch.toString().toUpperCase()}</Text> : ch)

  return <RippleEffect viewStyle={viewStyle} rippleStyle={rippleStyle} activeStyle={activeStyle} classes={null} className={null} mergeRulesetWithCascading={null} animations={null} {...rest}>
    {childs}
  </RippleEffect>
}

const Button = withStyles<MuixButton.Shape>(sheets(), { name: 'MuiButton' })(button)
export const ButtonIconLeft = withStyles<MuixButton.Shape>(sheets(true), { name: 'MuiButtonIconLeft' })(button)
export const ButtonIconRight = withStyles<MuixButton.Shape>(sheets(false), { name: 'MuiButtonIconRight' })(button)

export default Button