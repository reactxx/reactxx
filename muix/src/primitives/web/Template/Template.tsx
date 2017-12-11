import React from 'react'
import RN from 'react-native'

import { classNames, withStyles } from 'muix-styles/web/withStyles'
import { sheet } from 'muix-primitives/common/Template/Template' 

const template: Mui.CodeSFCWeb<MuiTemplate.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const Template = withStyles<MuiTemplate.Shape>(sheet, { name: 'MuiTemplate' })(template)

export default Template