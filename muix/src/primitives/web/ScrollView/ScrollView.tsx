import ReactN from 'react-native'
import React from 'react'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet, Shape } from '../../common/ScrollView/ScrollView' 

const scrollView: Mui.CodeSFCWeb<Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const ScrollView = withStyles<Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView