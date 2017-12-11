import RN from 'react-native'
import React from 'react'

import { classNames, withStyles } from 'muix-styles/web/withStyles'
import { sheet } from 'muix-primitives/common/ScrollView/ScrollView' 

const scrollView: Mui.CodeSFCWeb<MuiScrollView.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const ScrollView = withStyles<MuiScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView