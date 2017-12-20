import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/Text/Text' 

const text: Mui.CodeSFCWeb<MuiText.Shape> = props => {
  const { classes, innerRef, ...rest } = props 
  return <div className={classNames('mui-text', classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Text = withStyles<MuiText.Shape>(sheet, { name: 'MuiText' })(text)

export default Text