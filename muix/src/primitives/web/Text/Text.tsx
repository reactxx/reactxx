import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/Text/Text'
import { TextWeb } from '../for-components'

const text: Muix.CodeSFCWeb<MuixText.Shape> = props => {
  const { classes, theme, flip, innerRef, getStyleWithSideEffect, className, ...rest } = props
  return <TextWeb className={getStyleWithSideEffect(classes.root) as React.CSSProperties} $web={rest} />
}

const Text = withStyles<MuixText.Shape>(sheet, { name: 'MuiText' })(text)

export default Text