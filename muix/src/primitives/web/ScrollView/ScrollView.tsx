import ReactN from 'react-native'
import React from 'react'

import { classNames, withStyles } from 'muix-styles/web/withStyles'
import { sheet } from 'muix-primitives/common/ScrollView/ScrollView' 

//type TT = Record<(keyof Mui.getCommon<MuiScrollView.Shape>) & Mui.getWeb<MuiScrollView.Shape>, string>
//let x: {[P in keyof TT]: string}

type t = Mui.SheetWeb<MuiScrollView.Shape>

const scrollView: Mui.CodeSFCWeb<MuiScrollView.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const ScrollView = withStyles<MuiScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView