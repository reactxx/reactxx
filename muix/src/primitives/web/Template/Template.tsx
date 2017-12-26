import React from 'react'
import ReactN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet, Shape } from '../../common/Template/Template' 

const template: Mui.CodeSFCWeb<Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const Template = withStyles<Shape>(sheet, { name: 'MuiTemplate' })(template)

export default Template