import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet } from '../../common/View/View' 
import { View as RNView } from 'react-native' 

const view: Muix.CodeSFCNative<MuixView.Shape> = props => {
  const { classes, style, innerRef, ...rest } = props
  return <RNView style={classNames(style, classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const View = withStyles<MuixView.Shape>(sheet, { name: 'MuiView' })(view)

export default View