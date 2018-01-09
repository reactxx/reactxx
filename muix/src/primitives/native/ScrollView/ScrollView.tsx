import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet } from '../../common/ScrollView/ScrollView'
import { ScrollViewNative } from '../for-components'

const scrollView: Muix.CodeSFCNative<MuixScrollView.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, ...rest } = props
  return <ScrollViewNative className={getStyleWithSideEffect(classes.root) as ReactN.TextStyle} {...rest} />
}

const ScrollView = withStyles<MuixScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView