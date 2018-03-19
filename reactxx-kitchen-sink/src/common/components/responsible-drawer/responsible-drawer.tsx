// this code is 100% shared between web and native
import React from 'react'
import ReactN from 'react-native'

// different import of 'ScrollView, View, Text, Icon, AnimatedView' components for web and native
import { withStyles, ScrollView, View, Text, Icon, AnimatedView, LoremIpsum } from 'reactxx'

import { ThemeT, SheetsT } from 'reactxx-typings'

import { createContext, ConsumerType as StateConsumerType, ConsumerProps } from 'reactxx-stateman' 

// different import of 'Close, Menu' consts for web and native
import { Close } from 'reactxx-mdi/Close'
import { Menu } from 'reactxx-mdi/Menu'

//************************************************************************************************************
// ResponsibleDrawer typings
//************************************************************************************************************
export namespace ResponsibleDrawerT {

  export const enum Consts {
    Drawer = 'comps$responsibledrawer'
  }

  export interface RenderProps {
    style: SheetsT.RulesetX
    iconData: string,
    onPress: SheetsT.MouseEvent
  }

  export type Shape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content' | 'mobile' | 'tablet' | 'desktop'> & SheetsT.ShapeTexts<'openButton' | 'closeButton'>
    props: {
      //renderContent: (props: RenderProps) => JSX.Element
      drawer: JSX.Element
    }
    mediaq: 'mobile' | 'tablet' | 'desktop'
    animation: {
      mobile: SheetsT.ShapeViews<'drawer' | 'backDrop'>
      tablet: SheetsT.ShapeViews<'drawer' | 'content'>
    },
    compTheme: { //type of parameter
      drawerWidths: [number, number, number] //drawer width for Mobile, tablet and desktop
      breakpoints: [number, number] //media query breakpoints between mobile x tablet and tablet x desktop
      animationDuration: number //animation duration for mobile and tablet
    },
    nameType: Consts.Drawer
  }>
}

//************************************************************************************************************
// ResponsibleDrawer component
//************************************************************************************************************

// Provider and Consumer components for syncing visibility od Open x Close buttons with drawer open x close state
const { Provider, Consumer } = createContext<ResponsibleDrawerT.RenderProps>(null)

type ConsumerType = StateConsumerType<ResponsibleDrawerT.RenderProps, ResponsibleDrawerT.RenderProps>
type AnimationType = React.ComponentClass<SheetsT.PropsX<ResponsibleDrawerT.Shape>> & { LayoutChanged?: ConsumerType }

// ResponsibleDrawer's sheet. 
// It is parametrized by theme (not used here) and compThemePar. Default value of compThemePar is defined in withStyles HOC bellow
const sheet: ThemeT.SheetCreatorX<ResponsibleDrawerT.Shape> = (theme, compThemePar) => ({

  $mediaq: { // media query window-width breakpoints. Component receives actual width in "mediaq" prop and is rerendered when mediaq changed.
    mobile: [null, compThemePar.breakpoints[0]],
    tablet: [compThemePar.breakpoints[0], compThemePar.breakpoints[1]],
    desktop: [compThemePar.breakpoints[1], null],
  },

  $animations: { // different Animations (for mobile and tablet version of drawer)

    mobile: { // single animation (= single Animated.Value for NATIVE), for mobile
      drawer: { // animation ruleset for specific drawer element
        transform: [
          { translateX: [-compThemePar.drawerWidths[0], 0] }
        ],
      },
      backDrop: { //animation ruleset for backDrop element
        opacity: [0, 0.4], // change backDrop opacity
        transform: [ // appear backDrop during first 0.5% of whole animation time
          { translateX: [-5000, 0] },
          '-0.5' // means 0%-0.5% of $duration
        ],
      },
      $duration: compThemePar.animationDuration,
      $opened: false, //drawer is closed by default
    },

    tablet: { // tablet animation
      drawer: { // for drawer element
        transform: [
          { translateX: [-compThemePar.drawerWidths[1], 0] }
        ],
      },
      content: { // for content element - change left
        left: [0, compThemePar.drawerWidths[1]]
      },
      $duration: compThemePar.animationDuration,
      $opened: true, //drawer is opened by default
    }
  },

  root: {
    flex: 1,
    backgroundColor: 'white', //childs zIndex-ed elements (in Native) does not work without parent background
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
    $overrides: { // when 'mobile' ruleset is used then modify 'closeButton' and 'drawer' ruleset as follows:
      closeButton: { display: 'none' }, // modify closButton ruleset (hide it) for mobile
      drawer: { width: compThemePar.drawerWidths[0] }, // modify drawer ruleset (set width) for mobile
    }
  },
  tablet: { // when 'tablet' ruleset is used...
    $overrides: {
      backDrop: { display: 'none' },
      drawer: { width: compThemePar.drawerWidths[1] },
    }
  },
  desktop: { // when 'desktop' ruleset is used...
    $overrides: {
      closeButton: { display: 'none' },
      openButton: { display: 'none' },
      backDrop: { display: 'none' },
      content: { left: compThemePar.drawerWidths[2] },
      drawer: { width: compThemePar.drawerWidths[2] },
    }
  },
  // 'openButton' and 'closeButton' rulesets are defined by means of "mobile x tablet x desktop" $overrides
  openButton: {}, 
  closeButton: {},
})

// responsibleDrawer stateless component. 
const responsibleDrawer: SheetsT.CodeSFC<ResponsibleDrawerT.Shape> = props => {

  const { classes, mergeRulesetWithOverrides, children, className, animations, mediaq, drawer: drawerNode } = props

  const mediaState = mediaq.state // actual media width, e.g. mediaState = {mobile:false, tablet:true, desktop:false }

  const openDrawer = () => mediaState.tablet ? animations.tablet.open() : animations.mobile.open()
  const closeDrawer = () => mediaState.tablet ? animations.tablet.close() : animations.mobile.close()

  // calling mergeRulesetWithOverrides signals which rulesets are used. So it can use their $overrides to modify other sheet's rulesets
  const root = mergeRulesetWithOverrides(
    classes.root,
    // set actual ruleset for different window size
    mediaState.mobile && classes.mobile,
    mediaState.tablet && classes.tablet,
    mediaState.desktop && classes.desktop,
    className, // always put className at the end of the ROOT ruleset
  ) as SheetsT.ViewRulesetX

  const backDrop = mergeRulesetWithOverrides(
    classes.backDrop,
    mediaState.mobile && animations.mobile.sheet.backDrop, // backDrop animation for mobile
  ) as SheetsT.ViewRulesetX

  const drawer = mergeRulesetWithOverrides(
    classes.drawer,
    mediaState.mobile && animations.mobile.sheet.drawer, // drawer animation for mobile
    mediaState.tablet && animations.tablet.sheet.drawer, // drawer animation for tablet
  ) as SheetsT.ViewRulesetX

  const content = mergeRulesetWithOverrides(
    classes.content,
    mediaState.tablet && animations.tablet.sheet.content, // content animation for tablet
  ) as SheetsT.ViewRulesetX

  const closeButton = mergeRulesetWithOverrides(classes.closeButton) as SheetsT.TextRulesetX

  const openButton = mergeRulesetWithOverrides(
    classes.openButton,
    { display: mediaState.tablet && animations.tablet.opened || mediaState.desktop ? 'none' : 'flex' }
  ) as SheetsT.TextRulesetX

  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onPress={closeDrawer} />
    <AnimatedView key={2} className={drawer}>
      {/* Provider notifies inner Consumer's (i.e. ResponsibleDrawer.LayoutChanged component's) that some of their props changed */}
      <Provider value={{ iconData: Close, onPress: closeDrawer, style: closeButton }}>
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

// HOC ResponsibleDrawer component with default compThemePar's
export const ResponsibleDrawer = (withStyles<ResponsibleDrawerT.Shape>(
  'comps$responsibledrawer' as any/*ReactXXResponsibleDrawer.Consts.Drawer*/,
  sheet,
  {
    animationDuration: 300, // animation duration in msec
    drawerWidths: [250, 250, 300], // different opened drawer width for mobile, tablet and desktop
    breakpoints: [480, 1024] // media breakpoints between mobile x tablet and tablet x desktop
  })(responsibleDrawer)) as AnimationType

ResponsibleDrawer.LayoutChanged = Consumer as ConsumerType



//************************************************************************************************************
// Using ResponsibleDrawer in application
//************************************************************************************************************

const button = { color: 'white', fontSize: 28, $web: { cursor: 'pointer' } } as SheetsT.RulesetX

const App: React.SFC = () => <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} drawer={<Drawer/>}>
  <Content />
</ResponsibleDrawer>

const Drawer: React.SFC = () => <ScrollView classes={{ container: { flex: 1, backgroundColor: 'lightgray' } }}>
  <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, padding: 10, backgroundColor: 'gray', }}>
    <Text className={{ flexGrow: 1, color: 'white' }}>{LoremIpsum(2)}</Text>
    {/* re-render ResponsibleDrawer.LayoutChanged only when Provider notifies (hide x display it): */}
    <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />} />
  </View>
  <Text className={{ padding: 10 }}>{LoremIpsum(80)}</Text>
</ScrollView>

const Content: React.SFC = () => <ScrollView classes={{ container: { flex: 1 } }}> {/* content */}
  <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: 'blue', padding: 10 }}>
    {/* re-render ResponsibleDrawer.LayoutChanged only when Provider notifies (hide x display it): */}
    <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />} />
    <Text numberOfLines={1} className={{ flexGrow: 1, color: 'white', fontWeight: 'bold', marginLeft: 10, }}>{LoremIpsum(10)}</Text>
    <Text className={{ flexShrink: 0, color: 'white', fontWeight: 'bold', marginLeft: 10, }}>{LoremIpsum(2)}</Text>
  </View>
  <Text className={{ fontSize: 18, margin: 40, color: 'red' }}>
    {window.isWeb ? 'Change browser window width' : 'Rotate your device'} to see different Drawer's behavior for MOBILE, TABLET and DESKTOP
    </Text>
  {/* just for fun: change to lightgray color for 800px-1248px media width */}
  <Text className={{ padding: 10, $mediaq: { '800-1248': { color: 'lightgray' } } }}>{LoremIpsum(80)}</Text>
</ScrollView>

export default App
