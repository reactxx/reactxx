import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/Text/Text' 

const text: Muix.CodeSFCWeb<MuixText.Shape> = props => {
  const { classes, innerRef, ...rest } = props 
  return <div className={classNames('mui-text', classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Text = withStyles<MuixText.Shape>(sheet, { name: 'MuiText' })(text)

export default Text