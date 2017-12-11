import React from 'react'
import RN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web/withStyles'
import { sheet } from 'muix-primitives/common/View/View' 

const view: Mui.CodeSFCWeb<MuiView.Shape> = props => {
  const { classes, innerRef, ...rest } = props
  return <div className={classNames(classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const View = withStyles<MuiView.Shape>(sheet, { name: 'MuiViewx' })(view)

export default View