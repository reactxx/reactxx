import React from 'react'

import { TextX } from 'muix-primitives'
import { withStyles, sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixText.Shape>(({ typography: typo }) => ({
  root: typo.fontWeightRegularNew
}))

const text: Muix.CodeSFC<MuixText.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, style, children, ...rest } = props
  return <TextX className={getStyleWithSideEffect(classes.root)} style={style} $native={rest as ReactN.TextProperties} $web={rest as React.HTMLAttributes<HTMLDivElement>} children={children} />
}

const Text = withStyles<MuixText.Shape>(sheet, { name: 'MuiText' })(text)

export default Text