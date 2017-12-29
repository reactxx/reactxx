import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet } from '../../common/Template/Template' 
import { View } from 'react-native' 

const template: Muix.CodeSFCNative<MuixTemplate.Shape> = props => {
  const { classes, style, ...rest } = props
  return <View style={classNames(classes.root, style)}  {...rest}/>
}

const Template = withStyles<MuixTemplate.Shape>(sheet, { name: 'MuiTemplate' })(template)

export default Template