import React from 'react'
import { withStyles, sheetCreator, Text, View, AnimatedView, Icon, ScrollView } from 'muix-prim5s'

export const expandedPanelSheet = sheetCreator<DocHome.ExpandedPanelShape>({
  root: {}
})

const expandedPanel: Prim5s.CodeSFC<DocHome.ExpandedPanelShape> = props => {
  const { style, classes, className, mergeRulesetWithCascading, flip, theme, animations, ...rest } = props
  const rootStyle = mergeRulesetWithCascading(classes.root, className) as ReactN.ViewStyle
  return <View className={rootStyle} style={style}>
  </View>
}

export const ExpandedPanel = withStyles<DocHome.ExpandedPanelShape>(expandedPanelSheet, { name: 'DocHome$ExpandedPanelShape' })(expandedPanel)