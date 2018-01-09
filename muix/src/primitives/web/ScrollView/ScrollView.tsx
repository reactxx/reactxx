import ReactN from 'react-native'
import React from 'react'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/ScrollView/ScrollView'
import { ScrollViewWeb } from '../for-components'

const scrollView: Muix.CodeSFCWeb<MuixScrollView.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, className, ...rest } = props
  return <ScrollViewWeb className={getStyleWithSideEffect(classes.root) as React.CSSProperties} {...rest} />
}

const ScrollView = withStyles<MuixScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView