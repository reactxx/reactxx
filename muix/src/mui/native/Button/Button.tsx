import React from 'react'
import ReactN from 'react-native'
import { fade } from 'material-ui/styles/colorManipulator'
import { capitalize } from 'material-ui/utils/helpers';
import { ButtonProps } from 'material-ui/Button/Button'

import { mergeRulesets, TCommonStyles, TCommon } from 'reactxx-basic'
import { Types, TAddIn, TProvider, Text, withStylesCreator } from 'reactxx'
import { CompNames, TComps } from 'reactxx-primitives'

import { RippleEffect } from '../ButtonBase/ButtonBase'
import { MuiButtonT } from '../../typings/button'
import { MuiButtonBaseT } from '../../typings/button-base'
import { Muix } from '../../typings/muix'

const getTextIconColor = (color: string) => ({
  label: { color },
  labelIcon: {
    $native: { color }
  },
} as Types.PartialSheetX<MuiButtonT.Shape>)


const sheets: (isLeft?: boolean) => Types.SheetCreatorX<MuiButtonT.Shape> = isLeft => ({ typographyX: typoX, palette, spacing, shadowsNew }) => ({

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
    //$overrides: getTextIconColor(palette.action.disabled)
  },

  flat: {
    $native: {}
    //$overrides: {
    //  ripple: { backgroundColor: palette.grey[500], opacity: 0.8 },
    //}
  },
  flatPrimary: {
    //$overrides: {
    //  ripple: { backgroundColor: fade(palette.primary.main, 0.4), opacity: 0.8 },
    //  ...getTextIconColor(palette.primary.main)
    //},
  },
  flatSecondary: {
    //$overrides: {
    //  ripple: { backgroundColor: fade(palette.secondary.light, 0.4), opacity: 0.8 },
    //  ...getTextIconColor(palette.secondary.main)
    //},
  },

  raised: {
    backgroundColor: palette.grey[300],
    ...shadowsNew[2],
    //$overrides: {
    //  active: shadowsNew[8],
    //}
  },
  raisedPrimary: {
    backgroundColor: palette.primary.main,
    //$overrides: getTextIconColor(palette.primary.contrastText)
  },
  raisedSecondary: {
    backgroundColor: palette.secondary.main,
    //$overrides: getTextIconColor(palette.secondary.contrastText)
  },
  raisedDisable: {
    $native: {
      ...shadowsNew[0],
      backgroundColor: palette.action.disabledBackground,
    }
    //$overrides: getTextIconColor(palette.action.disabled),
  },
  raisedContrast: {
    //$overrides: getTextIconColor(palette.primary.contrastText)
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
    //$overrides: {
    //  active: shadowsNew[12],
    //}
  },

  mini: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  ripple: {
    $native: {
      backgroundColor: palette.common.white,
      opacity: 0.35,
    }
  },
  colorInherit: {
    $web: {}
  },
  label: {
  },
  labelIcon: {
    $native: {}
  },
  active: {
    $native: {}
  },
  keyboardFocused: {
    $web: {}
  },
})


const button: Types.CodeSFCNative<MuiButtonT.Shape> = (props, context) => {


  //var x = props.mini
  const { system: { classes, variant }, children, color = 'default', mini, ...rest } = props
  const { disabled } = rest //disabled must be propagated to ButtonBaseLow

  const fab = variant == 'fab'
  const raised = variant == 'raised'

  const isFlat = !raised && !fab

  const rootStyle = mergeRulesets<'View'>(
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

  )

  //console.log('### viewStyle: ', viewStyle)

  const rippleStyle = mergeRulesets<'View'>(classes.ripple)
  const activeStyle = mergeRulesets<'View'>(!disabled && classes.active)
  //const labelStyle = mergeRulesetWithOverrides(classes.label) 
  const iconOverride = { root: mergeRulesets(classes.labelIcon) } as Types.Sheet
  const labelOverride = { root: mergeRulesets(classes.label) } as Types.Sheet

  const childs = React.Children.toArray(children).map((ch, idx) => typeof ch === 'string' || typeof ch === 'number' ? <Text key={idx}>{ch.toString().toUpperCase()}</Text> : ch)

  //const RippleWithOverrides: React.SFC<MuiButtonBaseT.RippleEfectProps> = props => <ThemeModifier
  //  modify={compThemeSheetModifier<TComps.IconShape, TComps.TextShape>(CompNames.Icon, iconOverride, CompNames.Text, labelOverride)}>
  //  <RippleEffect {...props}/>
  //</ThemeModifier>
  //TODO
  const RippleWithOverrides: React.SFC<MuiButtonBaseT.RippleEfectProps> = props => null


  return <RippleWithOverrides viewStyle={rootStyle} rippleStyle={rippleStyle} activeStyle={activeStyle} {...rest}>
    {childs}
  </RippleWithOverrides>
}

const Button = withStylesCreator<MuiButtonT.Shape>(MuiButtonT.CompNames.Button, sheets(), button)()

export const ButtonIconStart = withStylesCreator<MuiButtonT.Shape>(MuiButtonT.CompNames.ButtonIconLeft, sheets(true),button)()
export const ButtonIconEnd = withStylesCreator<MuiButtonT.Shape>(MuiButtonT.CompNames.ButtonIconRight, sheets(false),button)()

export default Button