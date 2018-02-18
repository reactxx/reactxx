import React from 'react'
import { withStyles, sheetCreator, Text, View, AnimatedView, Icon, ScrollView } from 'reactxx'

export const expandedPanelSheet = sheetCreator<DocHome.ExpandedPanelShape>({
  $animations: {
    openClose: {
      content: {
        height: ['0px', '50px']
      },
      icon: {
        transform: [
          { rotate: ['0deg', '180deg'] }
        ]
      },
      $duration: 1000,
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
      BaseText: {
        root: {
          fontSize: 24, fontWeight: 'bold', color: 'white', flexGrow: 1,
        },
      }
    }
  },
  content: {
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
  const iconStyle = mergeRulesetWithOverrides(classes.icon, openClose.sheet.icon) as ReactN.TextStyle
  return <div style={{ height: '0px', overflow:'hidden' }}>
    zzzzz
  </div>
}

const ExpandedPanel = withStyles<DocHome.ExpandedPanelShape>(expandedPanelSheet, { name: 'DocHome$ExpandedPanelShape' })(expandedPanel)

const App: React.SFC = () => <div style={{ height: '0px', overflow: 'hidden' }}>
  zzzzz
  </div>

export default App