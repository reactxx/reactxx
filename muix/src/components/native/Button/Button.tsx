import React from 'react'
import ReactN from 'react-native'
import { Platform, View, Text } from 'react-native'

import { withStyles, classNames, toPlatformRuleSet, sheetCreator } from 'muix-styles'

import { Shape } from '../../common/Button/Button'
import ButtonBase from '../ButtonBase/ButtonBase'

export type ButtonShape = Shape

const sheet = sheetCreator<Shape>(({ typography: typo, palette, spacing, shadowsNew }) => ({ 
  native: {
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

    //flatPrimary: {}, flatAccent: {}, flatContrast: {}, colorInherit: {}, raisedContrast: {},

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

    ripple: {
      backgroundColor: palette.common.black,
      opacity: 0.12,
    }, 

    fab: {
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      borderRadius: 56 / 2,
      ...shadowsNew[6],
    },
    fabActive: shadowsNew[12],
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

    disabledLabel: { color: palette.action.disabled, },

  },
  common: {},
  web: {},
}))

const button: Mui.CodeSFCNative<Shape> = props => {
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
  } = props

  const flat = !raised && !fab
  const viewStyle = classNames<ReactN.ViewStyle>(
    classes.root,
    (raised || fab) && classes.raised,
    fab && classes.fab,
    !flat && color === 'accent' && classes.raisedAccent,
    !flat && color === 'primary' && classes.raisedPrimary,
    dense && classes.dense,
    raised && disabled && classes.raisedDisable,
    style,
  )
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

  //console.log(viewStyle, textStyle)

  const childs = React.Children.toArray(children).map((ch, idx) => {
    if (typeof ch === 'string' || typeof ch === 'number') return <Text key={idx} style={textStyle}>{ch.toString().toUpperCase()}</Text>
    else return React.cloneElement(ch, { ...ch.props, style: { ...textStyle, ...ch.props.style || null } })
  })

  return <ButtonBase style={viewStyle} disabled={disabled} {...other}>{childs}</ButtonBase>
}


const Button = withStyles<Shape>(sheet, { name: 'MuiButton' })(button)


//const btn = <Button classes={{ root: {}, denseLabel: { color: '' } }} color='accent' onClick={null} />

export default Button