import React from 'react'

import { classNames, withStyles } from 'muix-styles'
import { sheet } from '../../common/Template/Template' 
import { View } from 'react-native' 

const template: Mui.CodeSFCNative<MuiTemplate.Shape> = props => {
  const { classes, style, ...rest } = props
  return <View style={classNames(classes.root, style)}  {...rest}/>
}

const Template = withStyles<MuiTemplate.Shape>(sheet, { name: 'MuiTemplate' })(template)

export default Template