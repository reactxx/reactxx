import React from 'react'

import { withStyles, ScrollView, View, Text, Icon, AnimatedView, LoremIpsum } from 'reactxx'

/*testAnimation sheet creator pars: defined in const ResponsibleDrawer = withStyles*/
const sheet: ReactXX.CreateSheetX<testAnimation.Shape> = (theme, themePar) => ({

  $mediaq: {
    mobile: [null, themePar.breakpoints[0]],
    tablet: [themePar.breakpoints[0], themePar.breakpoints[1]],
    desktop: [themePar.breakpoints[1], null],
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
          '-0.5' // means 0%-0.5% of animation duration
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
  openButton: {},
  closeButton: {},
})

const responsibleDrawer: ReactXX.CodeSFC<testAnimation.Shape> = props => {
  const { classes, mergeRulesetWithOverrides, theme, children, style, className, animations, mediaq, renderContent, renderDrawer, ...rest } = props

  const mediaState = mediaq.state
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

  const openButton = mergeRulesetWithOverrides(classes.openButton, { display: drawerOpened ? 'none' : 'flex' }) as ReactXX.TextRulesetX

  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onPress={closeDrawer} >
      <Text style={{ marginTop: 60 }}>{JSON.stringify(backDrop, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={2} className={drawer}>
      {renderDrawer({ iconData: MDI.Close, onPress: closeDrawer, opened: drawerOpened, style: closeButton })}
    </AnimatedView>
    <AnimatedView key={3} className={content}>
      {renderContent({ iconData: MDI.Menu, onPress: openDrawer, opened: drawerOpened, style: openButton })}
    </AnimatedView>
  </View>
}
const ResponsibleDrawer = withStyles<testAnimation.Shape>(testAnimation.Consts.Drawer, sheet, { animationDuration: 300, drawerWidths: [250, 300, 400], breakpoints: [480, 1024] })(responsibleDrawer)


//*************************** Application with ResponsibleDrawer
const button = {
  color: 'white',
  fontSize: 28,
  $web: { cursor: 'pointer' }
} as ReactXX.RulesetX

//modifyThemeState={themeState => ({ ...themeState, theme: { ...themeState.theme, themePars: { ...themeState.theme.themePars, [testAnimation.Consts.Drawer]: { ...themeState.theme.themePars[testAnimation.Consts.Drawer], animationDuration:1000} } } })}

const App: React.SFC = () => <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} renderDrawer={
  ({ style, iconData, onPress }) => <ScrollView classes={{ container: { flex: 1, backgroundColor: 'lightgray' } }}>
    <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, padding: 10, backgroundColor: 'gray', }}>
      <Text className={{ flexGrow: 1, color: 'white' }}>{LoremIpsum(2)}</Text>
      <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />
    </View>
    <Text className={{ padding: 10 }}>{LoremIpsum(80)}</Text>
  </ScrollView>
} renderContent={
  ({ style, iconData, onPress }) => <ScrollView classes={{ container: { flex: 1 } }}>
    <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: 'blue', padding: 10 }}>
      <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />
      <Text className={{ color: 'white', fontWeight: 'bold', marginLeft: 10, }}>{LoremIpsum(5)}</Text>
    </View>
    <Text className={{ padding: 10, $mediaq: { '800-1248': { color: 'red' } } }}>{LoremIpsum(80)}</Text>
  </ScrollView>
} />

export default App
