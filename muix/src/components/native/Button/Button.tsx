import React from 'react'
import ReactN from 'react-native'
//import { Platform, View, Text } from 'react-native'
import { fade } from 'material-ui/styles/colorManipulator'
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';

import { withStyles, toPlatformRuleSet, sheetCreator } from 'muix-styles'

import { Text, iconColor } from 'muix-primitives'

import { RippleEffect } from '../ButtonBase/ButtonBase'

//export type ButtonShape = Shape
const getTextIconColor = (color:string) => ({
  MuiText: { root: {color} },
  MuiIcon: { root: iconColor(color) },
} as Muix.SheetsX)


const sheet = sheetCreator<MuixButton.Shape>(({ typography: typo, palette, spacing, shadowsNew }) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 88,
    minHeight: 36,
    paddingTop: spacing.unit,
    paddingBottom: spacing.unit,
    paddingLeft: spacing.unit * 2,
    paddingRight: spacing.unit * 2,
    borderRadius: 2,
    $childOverrides: {
      MuiIcon: { root: { fontSize: 24, } },
      MuiText: { root: { ...typo.button, color: palette.text.primary, } },
    }
  },
  dense: {
    paddingTop: spacing.unit - 1,
    paddingBottom: spacing.unit - 1,
    paddingLeft: spacing.unit,
    paddingRight: spacing.unit,
    minWidth: 64,
    minHeight: 32,
    $childOverrides: {
      MuiText: { root: { fontSize: typo.fontSize, } }
    }
  },

  disabled: {
    $childOverrides: getTextIconColor(palette.action.disabled)
  },

  flat: {
    $overrides: {
      ripple: { backgroundColor: palette.grey[500], opacity: 0.8 },
    }
  },
  flatPrimary: {
    $overrides: {
      ripple: { backgroundColor: fade(palette.primary[500], 0.4), opacity: 0.8 },
    },
    $childOverrides: getTextIconColor(palette.primary[500])
  },
  flatAccent: {
    $overrides: {
      ripple: { backgroundColor: fade(palette.secondary.A200, 0.4), opacity: 0.8 },
    },
    $childOverrides: getTextIconColor(palette.secondary.A200)
  },
  flatContrast: {
    $overrides: {
      ripple: { backgroundColor: fade(palette.getContrastText(palette.primary[500]), 0.4), opacity: 0.8 },
    },
    $childOverrides: getTextIconColor(palette.getContrastText(palette.primary[500]))
  },


  raised: {
    backgroundColor: palette.grey[300],
    ...shadowsNew[2],
    $overrides: {
      active: shadowsNew[8],
    }
  },

  raisedPrimary: {
    backgroundColor: palette.primary[500],
    $childOverrides: getTextIconColor(palette.getContrastText(palette.primary[500]))
  },
  raisedAccent: {
    backgroundColor: palette.secondary.A200,
    $childOverrides: getTextIconColor(palette.getContrastText(palette.secondary.A200))
  },
  raisedDisable: {
    ...shadowsNew[0],
    backgroundColor: palette.text.divider,
    $childOverrides: getTextIconColor(palette.getContrastText(palette.primary[500]))
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
    $overrides: {
      active: shadowsNew[12],
    }
  },
  active: {},

  mini: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  ripple: {
    backgroundColor: palette.common.white, opacity: 0.35,
  },
  colorInherit: {},
  label: {}
}))


const button: Muix.CodeSFCNative<MuixButton.Shape> = (props, context) => {

  const { children, classes, color = 'default', dense, fab, style, raised, mini, getStyleWithSideEffect, ...rest } = props
  const { disabled } = rest //disabled must be propagated to ButtonBaseLow

  const isFlat = !raised && !fab
  const Color = capitalizeFirstLetter(color)

  const viewStyle = getStyleWithSideEffect(
    classes.root,
    !isFlat && classes.raised,
    isFlat && classes.flat,
    !isFlat && classes[`raised${Color}`],
    fab && classes.fab,
    isFlat && classes[`flat${Color}`],
    mini && classes.mini,
    dense && classes.dense,
    !isFlat && disabled && classes.raisedDisable,
    isFlat && disabled && classes.disabled,
  ) as ReactN.ViewStyle

  const rippleStyle = getStyleWithSideEffect(classes.ripple) as ReactN.ViewStyle
  const activeStyle = getStyleWithSideEffect(!disabled && classes.active) as ReactN.ViewStyle

  //const labelStyle = classNames2<ReactN.ViewStyle>(context, classes.label)

  //console.log('button classes', context)
  //console.log(labelStyle)

  //const childs = React.Children.toArray(children).map((ch, idx) => {
  //  if (typeof ch === 'string' || typeof ch === 'number') return <Text key={idx} style={labelStyle}>{ch.toString().toUpperCase()}</Text>
  //  else return React.cloneElement(ch, { ...ch.props, style: { ...labelStyle, ...ch.props.style || null } })
  //})
  const childs = React.Children.toArray(children).map((ch, idx) => typeof ch === 'string' || typeof ch === 'number' ? <Text key={idx}>{ch.toString().toUpperCase()}</Text> : ch)

  return <RippleEffect viewStyle={viewStyle} rippleStyle={rippleStyle} activeStyle={activeStyle} classes={null} getStyleWithSideEffect={null} {...rest}>
    {childs}
  </RippleEffect>
}

const Button = withStyles<MuixButton.Shape>(sheet, { name: 'MuiButton' })(button)

export default Button