import ReactN from 'react-native'
import React from 'react'

import { classNames, withStyles } from 'muix-styles/web'
import { sheet } from '../../common/ScrollView/ScrollView'
import View from '../View/View'

const scrollView: Muix.CodeSFCWeb<MuixScrollView.Shape> = props => {
  const { classes, children, ...rest } = props
  return <div className={classNames(classes.root)} {...rest}>
    <View>
      {children}
    </View>
  </div>
}

const ScrollView = withStyles<MuixScrollView.Shape>(sheet, { name: 'MuiScrollView' })(scrollView)

export default ScrollView