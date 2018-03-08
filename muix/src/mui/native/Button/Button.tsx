import React from 'react'
import ReactN from 'react-native'

import { fade } from 'material-ui/styles/colorManipulator'
import { capitalize } from 'material-ui/utils/helpers';

import { Text, withStyles, toPlatformRuleSet, themeOverrideModifier, ThemeModifier } from 'reactxx'

import { RippleEffect } from '../ButtonBase/ButtonBase'

const getTextIconColor = (color: string) => ({
  label: { color },
  labelIcon: {color },
} as ReactXX.PartialSheetX<MuiButton.Shape>)


const sheets: (isLeft?: boolean) => ReactXX.SheetCreatorX<MuiButton.Shape> = isLeft => ({ typographyX: typoX, palette, spacing, shadowsNew }) => ({

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
    $overrides: {
      labelIcon: { lineHeight: 1.4 * 16, fontSize: 24, ...(isLeft === true ? { marginRight: spacing.unit } : (isLeft === false ? { marginLeft: spacing.unit } : {})) },
      label: { ...typoX.button, color: palette.text.primary, },
    },
  },

  disabled: {
    $overrides: getTextIconColor(palette.action.disabled)
  },

  flat: {
    $overrides: {
      ripple: { backgroundColor: palette.grey[500], opacity: 0.8 },
    }
  },
  flatPrimary: {
    $overrides: {
      ripple: { backgroundColor: fade(palette.primary.main, 0.4), opacity: 0.8 },
      ...getTextIconColor(palette.primary.main)
    },
  },
  flatSecondary: {
    $overrides: {
      ripple: { backgroundColor: fade(palette.secondary.light, 0.4), opacity: 0.8 },
      ...getTextIconColor(palette.secondary.main)
    },
  },

  raised: {
    backgroundColor: palette.grey[300],
    ...shadowsNew[2],
    $overrides: {
      active: shadowsNew[8],
    }
  },
  raisedPrimary: {
    backgroundColor: palette.primary.main,
    $overrides: getTextIconColor(palette.primary.contrastText)
  },
  raisedSecondary: {
    backgroundColor: palette.secondary.main,
    $overrides: getTextIconColor(palette.secondary.contrastText)
  },
  raisedDisable: {
    ...shadowsNew[0],
    backgroundColor: palette.action.disabledBackground,
    //$childOverrides: getTextIconColor(palette.action.disabled),
    $overrides: getTextIconColor(palette.action.disabled),
  },
  raisedContrast: {
    $overrides: getTextIconColor(palette.primary.contrastText)
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
    $overrides: {
      active: shadowsNew[12],
    }
  },

  mini: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  ripple: {
    backgroundColor: palette.common.white,
    opacity: 0.35,
  },
  colorInherit: {},
  label: {},
  labelIcon: {},
  active: {},
  keyboardFocused: {},
})


const button: ReactXX.CodeSFCNative<MuiButton.Shape> = (props, context) => {


  //var x = props.mini
  const { children, classes, color = 'default', variant, mini, mergeRulesetWithOverrides, className, animations, ...rest } = props
  const { disabled } = rest //disabled must be propagated to ButtonBaseLow

  const fab = variant == 'fab'
  const raised = variant == 'raised'

  const isFlat = !raised && !fab

  const rootStyle = mergeRulesetWithOverrides(
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

  const rippleStyle = mergeRulesetWithOverrides(classes.ripple) as ReactN.ViewStyle
  const activeStyle = mergeRulesetWithOverrides(!disabled && classes.active) as ReactN.ViewStyle
  //const labelStyle = mergeRulesetWithOverrides(classes.label) 
  const iconOverride = { root: mergeRulesetWithOverrides(classes.labelIcon) } as  ReactXX.SheetX
  const labelOverride = { root: mergeRulesetWithOverrides(classes.label) } as ReactXX.SheetX

  const childs = React.Children.toArray(children).map((ch, idx) => typeof ch === 'string' || typeof ch === 'number' ? <Text key={idx}>{ch.toString().toUpperCase()}</Text> : ch)

  const RippleWithOverrides: React.SFC<MuiButtonBase.RippleEfectProps> = props => <ThemeModifier
    modify={themeOverrideModifier<ReactXX.IconShape, ReactXX.TextShape>(ReactXX.CompNames.Icon, iconOverride, ReactXX.CompNames.Text, labelOverride)}>
    <RippleEffect {...props}/>
  </ThemeModifier>


  return <RippleWithOverrides viewStyle={rootStyle} rippleStyle={rippleStyle} activeStyle={activeStyle} classes={null} className={null} mergeRulesetWithOverrides={null} animations={null} {...rest}>
    {childs}
  </RippleWithOverrides>
}

const Button = withStyles<MuiButton.Shape>(MuiButton.CompNames.Button, sheets())(button)
export const ButtonIconStart = withStyles<MuiButton.Shape>(MuiButton.CompNames.ButtonIconLeft, sheets(true))(button)
export const ButtonIconEnd = withStyles<MuiButton.Shape>(MuiButton.CompNames.ButtonIconRight, sheets(false))(button)

export default Button