import React from 'react'
import ReactN from 'react-native'
import { Platform, View, Text } from 'react-native'
import { fade } from 'material-ui/styles/colorManipulator'
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';

import { withStyles, classNames2, toPlatformRuleSet, sheetCreator } from 'muix-styles/native'

import { ButtonBaseLow } from '../ButtonBase/ButtonBase'

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
      rulesetPatch: {
        '& $label': { fontSize: typo.fontSizeNormalizerNative(typo.fontSize - 1), },
      }
    },

    disabled: {
      rulesetPatch: {
        '& $label': { color: palette.action.disabled, },
      }
    },

    flat: {
      rulesetPatch: {
        '& $ripple': { backgroundColor: palette.grey[500], opacity: 0.8 },
      }
    },
    flatPrimary: {
      rulesetPatch: {
        '& $label': { color: palette.primary[500] },
        '& $ripple': { backgroundColor: fade(palette.primary[500], 0.4), opacity: 0.8 }, 
      }
    },
    flatAccent: {
      rulesetPatch: {
        '& $label': { color: palette.secondary.A200 },
        '& $ripple': { backgroundColor: fade(palette.secondary.A200, 0.4), opacity: 0.8 },
      }
    },
    flatContrast: {
      rulesetPatch: {
        '& $label': { color: palette.getContrastText(palette.primary[500]) },
        '& $ripple': { backgroundColor: fade(palette.getContrastText(palette.primary[500]), 0.4), opacity: 0.8 },
      }
    },


    raised: {
      backgroundColor: palette.grey[300],
      ...shadowsNew[2],
      rulesetPatch: {
        '& $active': shadowsNew[8],
      }
    },

    raisedPrimary: {
      backgroundColor: palette.primary[500],
      rulesetPatch: {
        '& $label': { color: palette.getContrastText(palette.primary[500]) },
      }
    },
    raisedAccent: {
      backgroundColor: palette.secondary.A200,
      rulesetPatch: {
        '& $label': { color: palette.getContrastText(palette.secondary.A200), },
      }
    },
    raisedDisable: {
      ...shadowsNew[0],
      backgroundColor: palette.text.divider,
      rulesetPatch: {
        '& $label': { color: palette.getContrastText(palette.primary[500]) },
      }
    },
    raisedContrast: {
      rulesetPatch: {
        '& $label': { color: palette.getContrastText(palette.primary[500]), },
      }
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
      rulesetPatch: {
        '& $active': shadowsNew[12],
      }
    },
    active: {},

    mini: {
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
    },
    label: {
      ...typo.button,
      color: palette.text.primary,
    },
  },
  native: {
    ripple: {
      backgroundColor: palette.common.white, opacity: 0.35,
    },
  },
  web: { } as any, //defined in material-ui only
}))

const button: Muix.CodeSFCNative<MuixButton.Shape> = props => {

  const { children, classes, color = 'default', dense, fab, style, raised, mini, ...rest } = props
  const { disabled } = rest //disabled must be propagated to ButtonBaseLow

  const isFlat = !raised && !fab
  const Color = capitalizeFirstLetter(color)

  const context = {}
  const viewStyle = classNames2<ReactN.ViewStyle>( 
    context,
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
    style,
  )

  const rippleStyle = classNames2<ReactN.ViewStyle>(context, classes.ripple)
  const activeStyle = classNames2<ReactN.ViewStyle>(context, !disabled && classes.active)
  const labelStyle = classNames2<ReactN.ViewStyle>(context, classes.label)

  //console.log('button classes', context)
  //console.log(labelStyle)

  const childs = React.Children.toArray(children).map((ch, idx) => {
    if (typeof ch === 'string' || typeof ch === 'number') return <Text key={idx} style={labelStyle}>{ch.toString().toUpperCase()}</Text>
    else return React.cloneElement(ch, { ...ch.props, style: { ...labelStyle, ...ch.props.style || null } })
  })

  return <ButtonBaseLow viewStyle={viewStyle} rippleStyle={rippleStyle} activeStyle={activeStyle} {...rest}>
    {childs}
  </ButtonBaseLow>
}

const Button = withStyles<MuixButton.Shape>(sheet, { name: 'MuiButton' })(button)

export default Button