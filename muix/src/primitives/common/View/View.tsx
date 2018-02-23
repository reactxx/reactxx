import React from 'react'
import ReactN from 'react-native'

import { ViewX, AnimatedViewX } from 'muix-primitives'
import { withStyles, sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixView.Shape>(() => ({
  root: {},

}))

const view: ReactXX.CodeSFC<MuixView.Shape> = props => {
  let { classes, theme, mergeRulesetWithOverrides, children, style, className, animations, ...rest } = props
  const $web = rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>
  const $native = rest as ReactN.ViewProperties
  return <ViewX className={mergeRulesetWithOverrides(classes.root, className)} $web={$web} $native={$native} children={children} style={style} />
}

const animatedView: ReactXX.CodeSFC<MuixView.Shape> = props => {
  const { classes, theme, mergeRulesetWithOverrides, children, style, className, animations, ...rest } = props
  const $web = rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>
  const $native = rest as ReactN.ViewProperties
  return <AnimatedViewX className={mergeRulesetWithOverrides(classes.root, className)} $web={$web} $native={$native} children={children} style={style} />
}

export const AnimatedView = withStyles<MuixView.Shape>(sheet, { name: 'MuiAnimatedView' })(animatedView)

const View = withStyles<MuixView.Shape>(sheet, { name: 'MuiView' })(view)
export default View
