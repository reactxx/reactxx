import React from 'react'
import ReactN from 'react-native'

import { ViewX, AnimatedViewX } from 'muix-primitives'
import { withStyles, sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixView.Shape>(() => ({
  $animations: {},
  root: {},
  
}))

const view: Muix.CodeSFC<MuixView.Shape> = props => {
  const { classes, theme, flip, getStyleWithSideEffect, children, style, className, animations, ...rest } = props
  return <ViewX className={getStyleWithSideEffect(classes.root, className)} $web={rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>} $native={rest as ReactN.ViewProperties} children={children} style={style} />
}

const animatedView: Muix.CodeSFC<MuixView.Shape> = props => {
  const { classes, theme, flip, getStyleWithSideEffect, children, style, className, animations, ...rest } = props
  return <AnimatedViewX className={getStyleWithSideEffect(classes.root, className)} $web={rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>} $native={rest as ReactN.ViewProperties} children={children} style={style} />
}

const View = withStyles<MuixView.Shape>(sheet, { name: 'MuiView' })(view)
export const AnimatedView = withStyles<MuixView.Shape>(sheet, { name: 'MuiAnimatedView' })(animatedView)

export default View
