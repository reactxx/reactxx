import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet, Shape } from '../../common/View/View' 

const view: Mui.CodeSFCWeb<Shape> = props => {
  const { classes, innerRef, ...rest } = props
  return <div className={classNames(classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const View = withStyles<Shape>(sheet, { name: 'MuiView' })(view)

export default View