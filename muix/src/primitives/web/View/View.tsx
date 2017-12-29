import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/View/View' 

const view: Muix.CodeSFCWeb<MuixView.Shape> = props => {
  const { classes, innerRef, ...rest } = props
  return <div className={classNames(classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const View = withStyles<MuixView.Shape>(sheet, { name: 'MuiView' })(view)

export default View