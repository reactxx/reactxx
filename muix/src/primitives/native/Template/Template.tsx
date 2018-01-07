import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet } from '../../common/Template/Template' 
import { View } from 'react-native' 

const template: Muix.CodeSFCNative<MuixTemplate.Shape> = props => {
  const { classes, style, ...rest } = props
  const viewStyle = props.getStyleWithSideEffect(classes.root) as ReactN.ViewStyle
  return <View style={{ ...viewStyle, ...style } }  {...rest} />
}

const Template = withStyles<MuixTemplate.Shape>(sheet, { name: 'MuiTemplate' })(template)

export default Template