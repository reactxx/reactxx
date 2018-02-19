import React from 'react'
import { withStyles, sheetCreator, Text, View, AnimatedView, Icon, ScrollView } from 'reactxx'

export const expandedPanelSheet = sheetCreator<DocHome.ExpandedPanelShape>({
  $animations: {
    openClose: {
      content: {
        height: ['0px', '50px'],
      },
      icon: {
        transform: [
          { rotate: ['0deg', '180deg'] }
        ]
      },
      $duration: 400,
      $opened: false,
    }
  },
  root: {
    marginTop: 10, marginBottom: 10,
    borderWidth: 1, borderColor: 'darkblue', borderStyle: 'solid' 
  },
  header: {
    padding: 10,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    alignItems: 'center',
    $overrides: {
      icon: {
        color: 'white', flexGrow: 0, flexShrink: 0,
        $web: { cursor: 'pointer' }
      },
    },
    $childOverrides: {
      [ReactXX.CompNames.Text]: {
        root: {
          fontSize: 24, fontWeight: 'bold', color: 'white', flexGrow: 1,
        },
      }
    }
  },
  content: {
    //minHeight: 0,
    overflow:'hidden',
    //backgroundColor: 'white'
    //padding: 10,
  },
  icon: {

  },
})


const expandedPanel: ReactXX.CodeSFC<DocHome.ExpandedPanelShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, flip, theme, animations: { openClose }, title, children, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className)
  const headerStyle = mergeRulesetWithOverrides(classes.header)
  const contentStyle = mergeRulesetWithOverrides(classes.content, openClose.sheet.content) as ReactN.ViewStyle
  delete contentStyle.height
  const iconStyle = mergeRulesetWithOverrides(classes.icon, openClose.sheet.icon) as ReactN.TextStyle
  return <View className={rootStyle} style={style}>
    <View className={headerStyle}>
      {typeof title === 'string' ? <Text numberOfLines={1}>{title}</Text> : title}
      <Icon data={MDI.ArrowExpandDown} className={iconStyle} onPress={() => openClose.toggle()} />
    </View>
    <AnimatedView className={contentStyle}>
      {children}
    </AnimatedView>
  </View>
}

const ExpandedPanel = withStyles<DocHome.ExpandedPanelShape>(expandedPanelSheet, { name: 'DocHome$ExpandedPanelShape' })(expandedPanel)

const App: React.SFC = () => <ScrollView classes={{ container: { padding: 10 } }}>
  <Text>Text before, text before, text before, text before, text before, text before, text before, text before, text before, text before, text before</Text>
  <ExpandedPanel title='Default panel header'>
    <Text style={{margin:10}}>Content Content Content Content Content Content </Text>
  </ExpandedPanel>
  <Text>Text between, text between, text between, text between, text between, text between, text between, text between, text between, text between, text between</Text>
  <ExpandedPanel title={<Text>Custom panel</Text>}>
    <Text style={{ margin: 10 }}>Content Content Content Content Content Content </Text>
  </ExpandedPanel>
  <Text>Text after, text after, text after, text after, text after, text after, text after, text after, text after, text after, text after</Text>
</ScrollView>

export default App