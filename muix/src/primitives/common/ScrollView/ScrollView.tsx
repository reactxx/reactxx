import React from 'react'
import ReactN from 'react-native'

import { withStyles, sheetCreator } from 'muix-styles'
import { ScrollViewX } from 'muix-primitives'

export const sheet = sheetCreator<MuixScrollView.Shape>(() => ({
  $animations: {},
  root: {},
  contentContainerStyle: {},
  
}))

const scrollView: Prim5s.CodeSFC<MuixScrollView.Shape> = props => {
  const { classes, theme, flip, getRulesetWithSideEffect, children, style, className, animations, ...rest } = props
  return <ScrollViewX
    className={getRulesetWithSideEffect(classes.root, className)} contentContainerStyle={getRulesetWithSideEffect(classes.contentContainerStyle)}
    style={style} $native={rest as ReactN.ScrollViewProperties} $web={rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>} children={children} />
}

const ScrollView = withStyles<MuixScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView