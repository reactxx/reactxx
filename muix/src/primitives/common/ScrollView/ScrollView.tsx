import React from 'react'

import { withStyles, sheetCreator } from 'muix-styles'
import { ScrollViewX } from 'muix-primitives'

export const sheet = sheetCreator<MuixScrollView.Shape>(() => ({
  root: {},
  contentContainerStyle: {}
}))

const scrollView: Muix.CodeSFC<MuixScrollView.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, children, style, ...rest } = props
  return <ScrollViewX
    className={getStyleWithSideEffect(classes.root)} contentContainerStyle={getStyleWithSideEffect(classes.contentContainerStyle)}
    style={style} $native={rest as ReactN.ScrollViewProperties} $web={rest as React.HTMLAttributes<HTMLDivElement>} children={children} />
}

const ScrollView = withStyles<MuixScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView