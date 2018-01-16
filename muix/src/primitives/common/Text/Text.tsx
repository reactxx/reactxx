import React from 'react'
import ReactN from 'react-native'

import { TextX } from 'muix-primitives'
import { withStyles, sheetCreator } from 'muix-styles'

export const sheet = sheetCreator<MuixText.Shape>(({ typographyX: typoX }) => ({
  root: typoX.fontWeightRegularNew,
  style: {},
}))

const text: Muix.CodeSFC<MuixText.Shape> = props => {
  const { classes, theme, flip, getStyleWithSideEffect, style, children, ...rest } = props
  return <TextX classNameInCode={getStyleWithSideEffect(classes.root, classes.style)} style={style} $native={rest as ReactN.TextProperties} $web={rest as React.HTMLAttributes<HTMLDivElement>} children={children} />
}

const Text = withStyles<MuixText.Shape>(sheet, { name: 'MuiText' })(text)

export default Text