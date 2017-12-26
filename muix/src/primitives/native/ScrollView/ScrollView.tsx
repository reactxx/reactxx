import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet, Shape } from '../../common/ScrollView/ScrollView'
import { ScrollView as ScrollViewRN } from 'react-native' 

const scrollView: Mui.CodeSFCNative<Shape> = props => {
  const { classes, style, ...rest } = props
  //console.log('scrollView: ', React.Children.count(rest.children))
  return <ScrollViewRN style={classNames(classes.root, style)} {...rest}/>
}

const ScrollView = withStyles<Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView