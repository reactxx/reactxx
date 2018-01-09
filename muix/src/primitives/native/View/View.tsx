import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles'
import { sheet } from '../../common/View/View'
import { ViewNative } from '../for-components'

const view: Muix.CodeSFCNative<MuixView.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, children, ...rest } = props
  return <ViewNative className={getStyleWithSideEffect(classes.root) as ReactN.ViewStyle} $native={rest} children={children} />
}

const View = withStyles<MuixView.Shape>(sheet, { name: 'MuiView' })(view)

export default View