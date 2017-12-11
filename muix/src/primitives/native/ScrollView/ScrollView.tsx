import React from 'react'

import { classNames, withStyles } from 'muix-styles/native/withStyles'
import { sheet } from 'muix-primitives/common/ScrollView/ScrollView'
import { ScrollView as ScrollViewRN } from 'react-native' 

const scrollView: Mui.CodeSFCNative<MuiScrollView.Shape> = props => {
  const { classes, style, ...rest } = props
  console.log('scrollView: ', React.Children.count(rest.children))
  return <ScrollViewRN style={classNames(classes.root, style)} {...rest}/>
}

const ScrollView = withStyles<MuiScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView