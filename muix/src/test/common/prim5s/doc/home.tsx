import React from 'react'
import { withStyles, sheetCreator, Text, View, AnimatedView, Icon, ScrollView } from 'muix-prim5s'

export const expandedPanelSheet = sheetCreator<DocHome.ExpandedPanelShape>({
  root: {
    padding: 10, margin: 10,
    borderWidth: 1, borderColor: 'lightgray', borderStyle: 'solid'
  },
  header: {
    $childOverrides: {
      BaseText: {
        root: {
          fontSize: 32, fontWeight: 'bold'
        },
      }
    }
  },
  content: {},
  closeIcon: {},
})

const expandedPanel: Prim5s.CodeSFC<DocHome.ExpandedPanelShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, title, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className) as ReactN.ViewStyle
  const headerStyle = mergeRulesetWithOverrides(classes.header) as ReactN.ViewStyle
  const contentStyle = mergeRulesetWithOverrides(classes.content) as ReactN.ViewStyle
  return <View className={rootStyle} style={style}>
    <View className={headerStyle}>
      {typeof title === 'string' ? <Text>{title}</Text> : title}
    </View>
    <View className={contentStyle}>
    </View>
  </View>
}

const ExpandedPanel = withStyles<DocHome.ExpandedPanelShape>(expandedPanelSheet, { name: 'DocHome$ExpandedPanelShape' })(expandedPanel)

const App: React.SFC = () => <ScrollView classes={{ container: { padding: 10} }}>
  <Text>Text before, text before, text before, text before, text before, text before, text before, text before, text before, text before, text before</Text>
  <ExpandedPanel title='Default panel'>
  </ExpandedPanel>
  <Text>Text between, text between, text between, text between, text between, text between, text between, text between, text between, text between, text between</Text>
  <ExpandedPanel title='Customized panel'>
  </ExpandedPanel>
  <Text>Text after, text after, text after, text after, text after, text after, text after, text after, text after, text after, text after</Text>
</ScrollView>

export default App