import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet, Shape } from '../../common/Template/Template' 
import { View } from 'react-native' 

const template: Mui.CodeSFCNative<Shape> = props => {
  const { classes, style, ...rest } = props
  return <View style={classNames(classes.root, style)}  {...rest}/>
}

const Template = withStyles<Shape>(sheet, { name: 'MuiTemplate' })(template)

export default Template