import * as React from 'react'

import { withStyles, ScrollView, View, Text, Icon, AnimatedView, LoremIpsum } from 'reactxx'
import { createContext, ConsumerType as StateConsumerType } from 'reactxx-stateman'

import { Close } from 'reactxx-mdi/Close'
import { Menu } from 'reactxx-mdi/Menu'

// (## 1 ##) Provider, Consumer component for syncing Open x Close buttons with drawer state
const { Provider, Consumer } = createContext<ReactXXResponsibleDrawer.RenderProps>(null)

type ConsumerType = StateConsumerType<ReactXXResponsibleDrawer.RenderProps, ReactXXResponsibleDrawer.RenderProps>
type AnimationType = React.ComponentClass<ReactXX.PropsX<ReactXXResponsibleDrawer.Shape>> & { LayoutChanged?: ConsumerType }

/*ResponsibleDrawer sheet creator pars: defined in const ResponsibleDrawer = withStyles*/
const sheet: ReactXX.SheetCreatorX<ReactXXResponsibleDrawer.Shape> = (theme, themePar) => ({

  // (## 3 ##) define ResponsibleDrawer sheet, parametrized by theme (not used here) and component's themePar

  $mediaq: { // (## 2 ##) define media query window-width breakpoints. Component receives actual width in "mediaq" prop and rerenders.
    mobile: [null, themePar.breakpoints[0]],
    tablet: [themePar.breakpoints[0], themePar.breakpoints[1]],
    desktop: [themePar.breakpoints[1], null],
  },

  $animations: { // different Animations (for mobile and tablet)

    mobile: { // single Animation (= single Animated.Value for NATIVE), for mobile
      drawer: { // animation ruleset for specific component, translate drawer
        transform: [
          { translateX: [-themePar.drawerWidths[0], 0] }
        ],
      },
      backDrop: {
        opacity: [0, 0.4], // change backDrop opacity
        transform: [ // appear drawer during first 0.5% of whole animation
          { translateX: [-5000, 0] },
          '-0.5' // means 0%-0.5% of $duration
        ],
      },
      $duration: themePar.animationDuration,
      $opened: false, //drawer is closed by default
    },

    tablet: { // tablet animation
      drawer: { // translate drawer
        transform: [
          { translateX: [-themePar.drawerWidths[1], 0] }
        ],
      },
      content: { // animate content left
        left: [0, themePar.drawerWidths[1]]
      },
      $duration: themePar.animationDuration,
      $opened: true, //drawer is opened by default
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
    $overrides: { // 
      closeButton: { display: 'none' }, // modify closButton ruleset (hide it) for mobile
      drawer: { width: themePar.drawerWidths[0] }, // modify drawer ruleset (set configured width) for mobile
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
  openButton: {}, // openButton rulesets is modified by "mobile x tablet x desktop" $overrides props
  closeButton: {},
})

const responsibleDrawer: ReactXX.CodeSFC<ReactXXResponsibleDrawer.Shape> = props => {
  const { classes, mergeRulesetWithOverrides, children, className, animations, mediaq, drawer: drawerNode } = props

  const mediaState = mediaq.state // (## 2 ##) actual media width

  const openDrawer = () => mediaState.tablet ? animations.tablet.open() : animations.mobile.open()
  const closeDrawer = () => mediaState.tablet ? animations.tablet.close() : animations.mobile.close()

  const root = mergeRulesetWithOverrides( // calling mergeRulesetWithOverrides signals which rulesets are used. So it can use their $overrides to modify sheet
    classes.root,
    // (## 2 ##) set actual ruleset for different window size
    mediaState.mobile && classes.mobile, 
    mediaState.tablet && classes.tablet,  
    mediaState.desktop && classes.desktop, 
    className, // always put className at the end of ROOT ruleset merge
  ) as ReactXX.ViewRulesetX

  const backDrop = mergeRulesetWithOverrides(
    classes.backDrop,
    mediaState.mobile && animations.mobile.sheet.backDrop, // backDrop animation for mobile
  ) as ReactXX.ViewRulesetX

  const drawer = mergeRulesetWithOverrides(
    classes.drawer,
    mediaState.mobile && animations.mobile.sheet.drawer, // drawer animation for mobile
    mediaState.tablet && animations.tablet.sheet.drawer, // drawer animation for tablet
  ) as ReactXX.ViewRulesetX

  const content = mergeRulesetWithOverrides(
    classes.content,
    mediaState.tablet && animations.tablet.sheet.content, // content animation for tablet
  ) as ReactXX.ViewRulesetX

  const closeButton = mergeRulesetWithOverrides(classes.closeButton) as ReactXX.TextRulesetX

  const openButton = mergeRulesetWithOverrides(classes.openButton, { display: mediaState.tablet && animations.tablet.opened || mediaState.desktop ? 'none' : 'flex' }) as ReactXX.TextRulesetX

  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onPress={closeDrawer} />
    <AnimatedView key={2} className={drawer}>
      <Provider value={{ iconData: Close, onPress: closeDrawer, style: closeButton }}> {/* (## 1 ##) Notify inner Consumer (i.e. ResponsibleDrawer.LayoutChanged component) that some of props (mainly style) changed */}
        {drawerNode}
      </Provider>
    </AnimatedView>
    <AnimatedView key={3} className={content}>
      <Provider value={{ iconData: Menu, onPress: openDrawer, style: openButton }}>
        {children}
      </Provider>
    </AnimatedView>
  </View>
}

// (## 3 ##) HOC ResponsibleDrawer component with default themePar's (animationDuration etc.)
const ResponsibleDrawer = (withStyles<ReactXXResponsibleDrawer.Shape>('comps$responsibledrawer'/*ReactXXResponsibleDrawer.Consts.Drawer*/, sheet, { animationDuration: 300, drawerWidths: [250, 300, 400], breakpoints: [480, 1024] })(responsibleDrawer)) as AnimationType
ResponsibleDrawer.LayoutChanged = Consumer as ConsumerType



//******************************************************
// Using ResponsibleDrawer in application
//******************************************************

const button = { color: 'white', fontSize: 28, $web: { cursor: 'pointer' } } as ReactXX.RulesetX

const App: React.SFC = () => <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} drawer={ // drawer
  <ScrollView classes={{ container: { flex: 1, backgroundColor: 'lightgray' } }}>
    <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, padding: 10, backgroundColor: 'gray', }}>
      <Text className={{ flexGrow: 1, color: 'white' }}>{LoremIpsum(2)}</Text>
      <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />} /> {/* (## 1 ##) rerender Icon when Provider notify (hide x display)*/ }
    </View>
    <Text className={{ padding: 10 }}>{LoremIpsum(80)}</Text>
  </ScrollView>
}>

  <ScrollView classes={{ container: { flex: 1 } }}> {/* content */}
    <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: 'blue', padding: 10 }}>
      <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />} /> {/* (## 1 ##) rerender Icon when Provider notify (hide x display)*/}
      <Text numberOfLines={1} className={{ flexGrow: 1, color: 'white', fontWeight: 'bold', marginLeft: 10, }}>{LoremIpsum(10)}</Text>
      <Text className={{ flexShrink:0, color: 'white', fontWeight: 'bold', marginLeft: 10, }}>{LoremIpsum(2)}</Text>
    </View>
    <Text className={{ fontSize: 32, margin: 40 }}>Resize window width to see different Drawer behavior for MOBILE, TABLET and DESKTOP</Text>
    <Text className={{ padding: 10, $mediaq: { '800-1248': { color: 'red' } } }}>{LoremIpsum(80)}</Text> {/* just for fun: change to red color for 800px-1248px media width. For web, converted by FELA to @media query CSS selector */}
  </ScrollView>

</ResponsibleDrawer>

export default App

//modifyThemeState={themeState => ({ ...themeState, theme: { ...themeState.theme, themePars: { ...themeState.theme.themePars, [testAnimation.Consts.Drawer]: { ...themeState.theme.themePars[testAnimation.Consts.Drawer], animationDuration:1000} } } })}
