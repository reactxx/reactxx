import React from 'react'
import ReactN from 'react-native'
import { Platform, View, Text } from 'react-native'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, classNames, toPlatformRuleSet, sheetCreator } from 'muix-styles'

import ButtonBase, { buttonBase } from '../ButtonBase/ButtonBase'

//export type ButtonShape = Shape

const sheet = sheetCreator<MuixButton.Shape>(({ typography: typo, palette, spacing, shadowsNew }) => ({
  common: {
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
    },
    dense: {
      paddingTop: spacing.unit - 1,
      paddingBottom: spacing.unit - 1,
      paddingLeft: spacing.unit,
      paddingRight: spacing.unit,
      minWidth: 64,
      minHeight: 32,
    },

    raised: {
      backgroundColor: palette.grey[300],
      ...shadowsNew[2],
    },
    raisedActive: shadowsNew[8],
    raisedPrimary: { backgroundColor: palette.primary[500] },
    raisedAccent: { backgroundColor: palette.secondary.A200, },

    raisedDisable: {
      ...shadowsNew[0],
      backgroundColor: palette.text.divider,
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
    },
    fabActive: shadowsNew[12],

    mini: {
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
    },
  },
  native: {
    ripple: {
      backgroundColor: palette.common.white, opacity: 0.35,
    },
    rootLabel: {
      ...typo.button,
      color: palette.text.primary,
    },
    denseLabel: { fontSize: typo.fontSizeNormalizerNative(typo.fontSize - 1), },

    flatLabelPrimary: { color: palette.primary[500], },
    flatLabelAccent: { color: palette.secondary.A200, },
    flatLabelContrast: { color: palette.getContrastText(palette.primary[500]), },

    raisedLabelAccent: { color: palette.getContrastText(palette.secondary.A200), },
    raisedLabelContrast: { color: palette.getContrastText(palette.primary[500]), },
    raisedLabelPrimary: { color: palette.getContrastText(palette.primary[500]), },

    accentFlatRipple: { backgroundColor: fade(palette.secondary.A200, 0.4), opacity: 0.8 },
    primaryFlatRipple: { backgroundColor: fade(palette.primary[500], 0.4), opacity: 0.8 },
    contrastFlatRipple: { backgroundColor: fade(palette.getContrastText(palette.primary[500]), 0.4), opacity: 0.8 },
    defaultFlatRipple: { backgroundColor: palette.grey[500], opacity: 0.8 },

    disabledLabel: { color: palette.action.disabled, },

  },
  web: { } as any, //defined in material-ui only
}))

class button extends buttonBase<MuixButton.Shape> {

  render() {

    const {
      children,
      classes,
      color = 'default',
      dense,
      disabled,
      fab,
      style,
      raised,
      ...other
    } = this.props

    const flat = !raised && !fab

    const textStyle = classNames<ReactN.TextStyle>(
      classes.rootLabel,
      flat && color === 'accent' && classes.flatLabelAccent,
      flat && color === 'contrast' && classes.flatLabelContrast,
      flat && color === 'primary' && classes.flatLabelPrimary,
      !flat && color === 'accent' && classes.raisedLabelAccent,
      !flat && color === 'contrast' && classes.raisedLabelContrast,
      !flat && color === 'primary' && classes.raisedLabelPrimary,
      dense && classes.denseLabel,
      disabled && classes.disabledLabel,
    )

    console.log(this.getRootStyle(), textStyle)

    const childs = React.Children.toArray(children).map((ch, idx) => {
      if (typeof ch === 'string' || typeof ch === 'number') return <Text key={idx} style={textStyle}>{ch.toString().toUpperCase()}</Text>
      else return React.cloneElement(ch, { ...ch.props, style: { ...textStyle, ...ch.props.style || null } })
    })

    return this.doRender(childs, flat ? classes[`${color}FlatRipple`] : (color === 'default' ? classes.defaultFlatRipple : null))
  }

  getRootStyle() {
    const {
      classes,
      color = 'default',
      dense,
      disabled,
      fab,
      style,
      mini,
      raised,
    } = this.props

    const flat = !raised && !fab
    const active = this.state.active === true

    return classNames<ReactN.ViewStyle>(
      classes.root,
      (raised || fab) && classes.raised,
      fab && classes.fab,
      mini && classes.mini,
      !flat && color === 'accent' && classes.raisedAccent,
      !flat && color === 'primary' && classes.raisedPrimary,
      dense && classes.dense,
      (raised || fab) && disabled && classes.raisedDisable,
      active && raised && !disabled && classes.raisedActive,
      active && fab && !disabled && classes.fabActive,
      style,
    )
  }
}

const Button = withStyles<MuixButton.Shape>(sheet, { name: 'MuiButton' })(button)

export default Button