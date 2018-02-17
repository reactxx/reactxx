import React from 'react'
import ReactN from 'react-native'

import { withStyles, sheetCreator } from 'muix-styles'
import { ScrollViewX } from 'muix-primitives'

export const sheet = sheetCreator<MuixScrollView.Shape>(() => ({
  root: {},
  contentContainerStyle: {},
  
}))

const scrollView: ReactXX.CodeSFC<MuixScrollView.Shape> = props => {
  const { classes, theme, flip, mergeRulesetWithOverrides, children, style, className, animations, ...rest } = props
  return <ScrollViewX
    className={mergeRulesetWithOverrides(classes.root, className)} contentContainerStyle={mergeRulesetWithOverrides(classes.contentContainerStyle)}
    style={style} $native={rest as ReactN.ScrollViewProperties} $web={rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>} children={children} />
}

const ScrollView = withStyles<MuixScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView