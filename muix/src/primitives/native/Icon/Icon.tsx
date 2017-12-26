import React from 'react'
import { icons } from 'muix-icons/index'

import { toPlatformSheet, withStyles, classNames } from 'muix-styles'

import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'

import { getClasses, sheet, Shape } from '../../common/Icon/Icon'

const icon: Mui.CodeSFCNative<Shape> = props => {
  const { classes: { iconClass }, name, style, rest, innerRef } = getClasses<Mui.RNIconStyle>(props)
  return <MIcon name={name as any} style={classNames(iconClass, style as Mui.RNIconStyle)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Icon = withStyles<Shape>(sheet, { name: 'MuiIcon' })(icon)

export default Icon
