import React from 'react'
import { withStyles, sheetCreator, Text, View, AnimatedView, Icon, ScrollView } from 'muix-prim5s'

export const expandedPanelSheet = sheetCreator<DocHome.ExpandedPanelShape>({
  root: {
    marginTop: 10, marginBottom: 10,
    borderWidth: 1, borderColor: 'darkblue', borderStyle: 'solid'
  },
  header: {
    padding: 10,
    backgroundColor: 'darkblue',
    $childOverrides: {
      BaseText: {
        root: {
          fontSize: 24, fontWeight: 'bold', color: 'white'
        },
      }
    }
  },
  content: {
    padding: 10,
  },
  closeIcon: {},
})


const expandedPanel: Prim5s.CodeSFC<DocHome.ExpandedPanelShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations, title, children,...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className) as ReactN.ViewStyle
  const headerStyle = mergeRulesetWithOverrides(classes.header) as ReactN.ViewStyle
  const contentStyle = mergeRulesetWithOverrides(classes.content) as ReactN.ViewStyle
  return <View className={rootStyle} style={style}>
    <View className={headerStyle}>
      {typeof title === 'string' ? <Text>{title}</Text> : title}
    </View>
    <View className={contentStyle}>
      {children}
    </View>
  </View>
}

const ExpandedPanel = withStyles<DocHome.ExpandedPanelShape>(expandedPanelSheet, { name: 'DocHome$ExpandedPanelShape' })(expandedPanel)

const App: React.SFC = () => <ScrollView classes={{ container: { padding: 10} }}>
  <Text>Text before, text before, text before, text before, text before, text before, text before, text before, text before, text before, text before</Text>
  <ExpandedPanel title='Default panel'>
    <Text>Content Content Content Content Content Content </Text>
  </ExpandedPanel>
  <Text>Text between, text between, text between, text between, text between, text between, text between, text between, text between, text between, text between</Text>
  <ExpandedPanel title={<Text>Custom panel</Text>}>
    <Text>Content Content Content Content Content Content </Text>
  </ExpandedPanel>
  <Text>Text after, text after, text after, text after, text after, text after, text after, text after, text after, text after, text after</Text>
</ScrollView>

export default App