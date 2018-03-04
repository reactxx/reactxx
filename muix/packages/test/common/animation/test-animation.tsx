import React from 'react'
import ReactDOM from 'react-dom'

import { withStyles, View, Text, AnimatedView } from 'reactxx'

const sheet: ReactXX.CreateSheetX<testAnimation.Shape> = (theme, themePar) => ({
  $animations: { // different Animations
    mobile: { // single Animation (= single Animated.Value for NATIVE)
      drawer: { // animation ruleset for specific component
        transform: [
          { translateX: [-themePar.drawerWidths[0], 0] }
        ],
      },
      backDrop: {
        opacity: [0, 0.4],
        transform: [
          { translateX: [-5000, 0] },
          '-0.5' // means 0%-0.5%
        ],
      },
      $duration: themePar.animationDuration,
      $opened: false,
    },
    tablet: {
      drawer: {
        transform: [
          { translateX: [-themePar.drawerWidths[1], 0] }
        ],
      },
      content: {
        left: [0, themePar.drawerWidths[1]]
      },
      $duration: themePar.animationDuration,
      $opened: true,
    }
  },
  root: {
    flex: 1,
    backgroundColor: 'white', //childs zIndex (in Native) does not work without parent background
  },
  backDrop: {
    position: 'absolute',
    bottom: 0, top: 0, left: 0, right: 0,
    backgroundColor: 'black',
    zIndex: 3
  },
  drawer: {
    position: 'absolute',
    bottom: 0, top: 0, left: 0,
    backgroundColor: 'lightgreen',
    zIndex: 5
  },
  content: {
    position: 'absolute',
    bottom: 0, top: 0, left: 0, right: 0,
    zIndex: 1
  },
  mobile: {
    $overrides: {
      closeButton: { display: 'none' },
      drawer: { width: themePar.drawerWidths[0] },
    }
  },
  tablet: {
    $overrides: {
      backDrop: { display: 'none' },
      drawer: { width: themePar.drawerWidths[1] },
    }
  },
  desktop: {
    $overrides: {
      closeButton: { display: 'none' },
      openButton: { display: 'none' },
      backDrop: { display: 'none' },
      content: { left: themePar.drawerWidths[2] },
      drawer: { width: themePar.drawerWidths[2] },
    }
  },
  openButton: { color: 'blue', padding: 10 },
  closeButton: { color: 'blue', padding: 10 },
})

const drawerLayout: ReactXX.CodeSFC<testAnimation.Shape> = props => {
  const { classes, mergeRulesetWithOverrides, theme, children, style, className, animations, mobile, tablet, desktop, ...rest } = props

  const open = () => tablet ? animations.tablet.open() : animations.mobile.open()
  const close = () => tablet ? animations.tablet.close() : animations.mobile.close()
  const opened = tablet && animations.tablet.opened || mobile && animations.mobile.opened || desktop

  const root = mergeRulesetWithOverrides( // calling getRulesetWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
    classes.root,
    mobile && classes.mobile,
    tablet && classes.tablet,
    desktop && classes.desktop,
    className,
  ) as ReactXX.ViewRulesetX

  const backDrop = mergeRulesetWithOverrides(
    classes.backDrop,
    mobile && animations.mobile.sheet.backDrop,
  ) as ReactXX.ViewRulesetX

  const drawer = mergeRulesetWithOverrides(
    classes.drawer,
    mobile && animations.mobile.sheet.drawer,
    tablet && animations.tablet.sheet.drawer,
  ) as ReactXX.ViewRulesetX

  const content = mergeRulesetWithOverrides(
    classes.content,
    tablet && animations.tablet.sheet.content,
  ) as ReactXX.ViewRulesetX

  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onPress={close} >
      <Text style={{ marginTop: 60 }}>{JSON.stringify(backDrop, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={2} className={drawer}>
      <Text className={mergeRulesetWithOverrides(classes.closeButton, { ...btnStyle, textAlign: 'right' }) as ReactXX.TextRulesetX} onPress={close} >CLOSE</Text>
      <Text style={{ marginTop: 60 }}>{JSON.stringify(drawer, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={3} className={content}>
      <View key={1} className={mergeRulesetWithOverrides(classes.openButton, { flexDirection: 'row', display: opened ? 'none' : 'flex' }) as ReactXX.ViewRulesetX} >
        <Text onPress={open} className={{ ...btnStyle, alignSelf: 'flex-start' }}>OPEN</Text>
      </View>
      <Text style={{ marginTop: 120 }}>{JSON.stringify(content, null, 2)}</Text>
    </AnimatedView>
  </View>
}
const DrawerLayout = withStyles<testAnimation.Shape>(testAnimation.Consts.Drawer, sheet, { animationDuration: 300, drawerWidths: [250, 300, 400] })(drawerLayout)

const btnStyle: ReactXX.RulesetX<ReactN.TextStyle> = { color: 'blue', padding: 10 }

class App extends React.Component {
  state = { mobile: true, tablet: false, desktop: false }
  render() {
    const initState = { mobile: false, tablet: false, desktop: false }
    return <View className={{ flex: 1, $native: { marginTop: 24 } }}>
      <View className={{ flexDirection: 'row' }}>
        <Text onPress={() => this.setState({ ...initState, mobile: true })} className={btnStyle}>MOBILE</Text>
        <Text onPress={() => this.setState({ ...initState, tablet: true })} className={btnStyle}>TABLET</Text>
        <Text onPress={() => this.setState({ ...initState, desktop: true })} className={btnStyle}>DESKTOP</Text>
      </View>
      <DrawerLayout {...this.state} />
    </View>
  }
}
export default App
