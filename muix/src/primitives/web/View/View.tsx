import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/View/View' 
import { ViewWeb } from '../for-components'

const view: Muix.CodeSFCWeb<MuixView.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, className, children, ...rest } = props
  return <ViewWeb className={getStyleWithSideEffect(classes.root) as React.CSSProperties} $web={rest} children={children} />
}

const View = withStyles<MuixView.Shape>(sheet, { name: 'MuiView' })(view)

export default View