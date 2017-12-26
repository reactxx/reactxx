import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet, Shape } from '../../common/Text/Text' 
import { Text as RNText } from 'react-native' 

const text: Mui.CodeSFCNative<Shape> = props => {
  const { classes, style, innerRef, ...rest } = props
  return <RNText style={classNames<ReactN.TextStyle>(classes.root, style)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Text = withStyles<Shape>(sheet, { name: 'MuiText' })(text)

export default Text