import React from 'react'
import ReactN from 'react-native'

import { TextX } from 'muix-primitives'
import { withStyles, sheetCreator, toPlatformRuleSet, toPlatformSheet } from 'muix-styles'

export const sheet = sheetCreator<MuixText.Shape>(({ typographyX: typoX }) => ({
  root: typoX.fontWeightRegularNew,
}))

const text: Prim5s.CodeSFC<MuixText.Shape> = props => {
  const { classes, theme, flip, mergeRulesetWithOverrides, style, children, className, animations, ...rest } = props
  return <TextX className={mergeRulesetWithOverrides(classes.root, className)} style={style} $native={rest as ReactN.TextProperties} $web={rest as NoPartial<React.HTMLAttributes<HTMLDivElement>>} children={children} />
}

const Text = withStyles<MuixText.Shape>(sheet, { name: 'MuiText' })(text)

export default Text