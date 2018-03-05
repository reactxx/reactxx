import React from 'react'
import ReactDOM from 'react-dom'

import { withStyles, View, Text, AnimatedView } from 'reactxx'

const sheet: ReactXX.CreateSheetX<testAnimation.Shape> = (theme, themePar) => ({
  $mediaq: {
    mobile: [null, themePar[0]],
    tablet: [themePar[0], themePar[1]],
    desktop: [themePar[1], null],
  },
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
  openButtonContainer: { padding: 10, alignSelf: 'flex-start', flexDirection: 'row'},
  openButton: { color: 'blue' },
  closeButton: { color: 'blue', padding: 10, alignSelf: 'flex-end' },
})

const responsibleDrawer: ReactXX.CodeSFC<testAnimation.Shape> = props => {
  const { classes, mergeRulesetWithOverrides, theme, children, style, className, animations, mediaq: { state: mediaState }, ...rest } = props

  const openDrawer = () => mediaState.tablet ? animations.tablet.open() : animations.mobile.open()
  const closeDrawer = () => mediaState.tablet ? animations.tablet.close() : animations.mobile.close()
  const drawerOpened = mediaState.tablet && animations.tablet.opened || mediaState.mobile && animations.mobile.opened || mediaState.desktop

  const root = mergeRulesetWithOverrides( // calling mergeRulesetWithOverrides signals which rulesets are used. So it can use their $overrides to modify sheet
    classes.root,
    mediaState.mobile && classes.mobile,
    mediaState.tablet && classes.tablet,
    mediaState.desktop && classes.desktop,
    className,
  ) as ReactXX.ViewRulesetX

  const backDrop = mergeRulesetWithOverrides(
    classes.backDrop,
    mediaState.mobile && animations.mobile.sheet.backDrop,
  ) as ReactXX.ViewRulesetX

  const drawer = mergeRulesetWithOverrides(
    classes.drawer,
    mediaState.mobile && animations.mobile.sheet.drawer,
    mediaState.tablet && animations.tablet.sheet.drawer,
  ) as ReactXX.ViewRulesetX

  const content = mergeRulesetWithOverrides(
    classes.content,
    mediaState.tablet && animations.tablet.sheet.content,
  ) as ReactXX.ViewRulesetX

  const closeButton = mergeRulesetWithOverrides(classes.closeButton) as ReactXX.TextRulesetX

  const openButton = mergeRulesetWithOverrides(classes.openButton) as ReactXX.TextRulesetX

  const openButtonContainer = mergeRulesetWithOverrides(
    classes.openButtonContainer,
    { display: drawerOpened ? 'none' : 'flex' }
  ) as ReactXX.ViewRulesetX

  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onPress={closeDrawer} >
      <Text style={{ marginTop: 60 }}>{JSON.stringify(backDrop, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={2} className={drawer}>
      <Text className={closeButton} onPress={closeDrawer}>CLOSE</Text>
      <Text style={{ marginTop: 60 }}>{JSON.stringify(drawer, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={3} className={content}>
      <View key={1} className={openButtonContainer} >
        <Text onPress={openDrawer} className={openButton}>OPEN</Text>
      </View>
      <Text style={{ marginTop: 120 }}>{JSON.stringify(content, null, 2)}</Text>
    </AnimatedView>
  </View>
}
const ResponsibleDrawer = withStyles<testAnimation.Shape>(testAnimation.Consts.Drawer, sheet, { animationDuration: 300, drawerWidths: [250, 300, 400], breakpoints: [480, 1024] })(responsibleDrawer)


class App extends React.Component {
  //state = { mobile: true, tablet: false, desktop: false }
  render() {
    //const btnStyle: ReactXX.RulesetX<ReactN.TextStyle> = { color: 'blue', padding: 10 }
    //const initState = { mobile: false, tablet: false, desktop: false }
    return <ResponsibleDrawer className={{ flex: 1, $native: { marginTop: 24 } }} />
    //<View className={{ flex: 1, $native: { marginTop: 24 } }}>
    //  <View className={{ flexDirection: 'row' }}>
    //    <Text onPress={() => this.setState({ ...initState, mobile: true })} className={btnStyle}>MOBILE</Text>
    //    <Text onPress={() => this.setState({ ...initState, tablet: true })} className={btnStyle}>TABLET</Text>
    //    <Text onPress={() => this.setState({ ...initState, desktop: true })} className={btnStyle}>DESKTOP</Text>
    //  </View>
    //  <ResponsibleDrawer className={{ flex: 1, $native: { marginTop: 24 } }} />
    //</View>
  }
}
export default App
