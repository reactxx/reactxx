import React from 'react'
import { withStyles, Text, View, AnimatedView, AnimatedIcon, ScrollView } from 'reactxx'

import { Animated } from 'react-native'

const expandedPanelSheet: ReactXX.CreateSheetX<DocHome.ExpandedPanelShape> = {
  $animations: {
    openClose: {
      content: {
        height: [0, 50],
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
    borderWidth: 1, borderColor: 'darkblue', borderStyle: 'solid',
    $mediaq: {
      '-480': {
      },
      '480-1024': {
      },
      '1024-': {
      }
    }
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
      headerLabel: {
        fontSize: 24, fontWeight: 'bold', color: 'white', flexGrow: 1,
      }
    },
  },
  content: {
    //minHeight: 0,
    overflow: 'hidden',
    //backgroundColor: 'white'
    //padding: 10,
  },
  icon: { },
  headerLabel: {},
}


//modifyThemeStates(state, null, theme => [modifyThemeState<ReactXX.TextShape>(state, theme, ReactXX.CompNames.Text, (theme, par) => ({ root: headerLabelStyle }))])}

const expandedPanel: ReactXX.CodeSFC<DocHome.ExpandedPanelShape> = props => {
  const { style, classes, className, mergeRulesetWithOverrides, theme, animations: { openClose }, title, children, ...rest } = props
  const rootStyle = mergeRulesetWithOverrides(classes.root, className) as ReactN.ViewStyle
  const headerStyle = mergeRulesetWithOverrides(classes.header) as ReactN.ViewStyle
  const contentStyle = mergeRulesetWithOverrides(classes.content, openClose.sheet.content) as ReactN.ViewStyle
  const iconStyle = mergeRulesetWithOverrides(classes.icon, openClose.sheet.icon) as ReactN.TextStyle
  const headerLabelStyle = mergeRulesetWithOverrides(classes.headerLabel) as ReactN.TextStyle

  return <View className={rootStyle} style={style as ReactXX.ViewStyle}>
    <View className={headerStyle} /*modifyThemeState={theme => ({ ...theme, overridesNew: { ...theme.overridesNew, [ReactXX.CompNames.Text]: { root: headerLabelStyle}}})}*/>
      {typeof title === 'string' ? <Text numberOfLines={1}>{title}</Text> : title}
      <AnimatedIcon data={MDI.ArrowExpandDown} className={iconStyle} onPress={() => openClose.toggle()} /> 
    </View>
    <AnimatedView className={contentStyle}>
      {children}
    </AnimatedView>
  </View>
}
/*
      <AnimatedIcon data={MDI.ArrowExpandDown} className={iconStyle} onPress={() => openClose.toggle()} />
      <AnimatedIconLow name={MDI.ArrowExpandDown} style={iconStyle} onPress={() => openClose.toggle()} />
*/

const ExpandedPanel = withStyles<DocHome.ExpandedPanelShape>(DocHome.CompNames.ExpandPanel, expandedPanelSheet)(expandedPanel)

const App: React.SFC = () => <ScrollView classes={{ container: { padding: 10 } }}>
  <Text>Text before, text before, text before, text before, text before, text before, text before, text before, text before, text before, text before</Text>
  <ExpandedPanel title='Default panel header'>
    <Text style={{ margin: 10 }}>Content Content Content Content Content Content </Text>
  </ExpandedPanel>
  <Text>Text between, text between, text between, text between, text between, text between, text between, text between, text between, text between, text between</Text>
  <ExpandedPanel title={<Text>Custom panel</Text>}>
    <Text style={{ margin: 10 }}>Content Content Content Content Content Content </Text>
  </ExpandedPanel>
  <Text>Text after, text after, text after, text after, text after, text after, text after, text after, text after, text after, text after</Text>
</ScrollView>

export default App