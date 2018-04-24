import React from 'react'
import ReactN from 'react-native'

import { Types } from 'reactxx-basic'
import * as MediaQ from 'reactxx-mediaq'
import { TAddInConfig, TComps, TTheme, TBasic, withStyles, ScrollView, View, Text, Icon, AnimatedView, variantToString, AppContainer } from 'reactxx'
import { LoremIpsum } from 'reactxx-basic'

//******* Two possibilities how to use get icon data:

// for Typescript only. Typescript replaces e.g. MDI.Close by its value on EVERY MDI.Close's occurence.
// for Native: MDI.Close = 'close'
// for SVG Web: MDI.Close = 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
import MDI from 'reactxx-mdi'

// 'Menu' variable contains correct platform specific value 
import { Menu } from 'reactxx-mdi/Menu'


//************************************************************************************************************
// ResponsibleDrawer typings
//************************************************************************************************************
export namespace TResponsibleDrawer {

  export const enum Consts {
    Drawer = 'comps$responsibledrawer'
  }

  export interface IconRenderProps {
    style: TBasic.RulesetX
    iconData: string,
    onPress: Types.MouseEvent
  }

  export interface Variant extends MediaQ.CodeProps<TBasic.getMediaQ<Shape>> {
    drawerWidths: [number, number, number] //drawer width for mobile, tablet and desktop
    animationDuration: number //drawer animation duration for mobile and tablet
  }
  export interface Props {
    drawerWidths: [number, number, number] //drawer width for mobile, tablet and desktop
    animationDuration: number //drawer animation duration for mobile and tablet
    drawer: JSX.Element //drawer content
  }


  export type Shape = TBasic.OverwriteShape<{
    common: TComps.ShapeViews<'root' | 'drawer' | 'backDrop' | 'content'> & TComps.ShapeTexts<'openButton' | 'closeButton'>
    props: Props
    mediaq: 'mobile' | 'tablet' | 'desktop' // media query breakpoints names
    animation: { //animation sheets
      mobile: TComps.ShapeViews<'drawer' | 'backDrop'> // mobile animation sheet
      tablet: TComps.ShapeViews<'drawer' | 'content'> // tablet animation sheet
    }
    variant: Variant
    nameType: Consts.Drawer
  }>
}

//************************************************************************************************************
// ResponsibleDrawer component
//************************************************************************************************************

// Provider and Consumer for syncing visibility of <Open x Close buttons> with <drawer open x close state>
const { Provider, Consumer } = React.createContext<TResponsibleDrawer.IconRenderProps>({} as any)

//type ConsumerType = StateConsumerType<TResponsibleDrawer.RenderProps, TResponsibleDrawer.RenderProps>
type AnimationType = React.ComponentType<TBasic.PropsX<TResponsibleDrawer.Shape>> & { LayoutChanged?: typeof Consumer }

// ResponsibleDrawer's sheet. 
// It is parametrized by theme (not used here) and compThemePar. Default value of compThemePar is defined in withStyles HOC bellow
const sheet: TTheme.SheetCreatorX<TResponsibleDrawer.Shape> = (theme, variant) => {

  const { animationDuration, drawerWidths, mediaqCode: { mobile: isMobile, tablet: isTablet, desktop: isDesktop } } = variant

  return {

    $animations: { // different Animations (for mobile and tablet version of drawer)

      mobile: { // single animation (= single Animated.Value for NATIVE), for mobile
        drawer: { // animation ruleset for specific drawer element
          transform: [
            { translateX: [-drawerWidths[0], 0] }
          ],
        },
        backDrop: { //animation ruleset for backDrop element
          opacity: [0, 0.4], // change backDrop opacity
          transform: [ // appear backDrop during first 0.5% of whole animation time
            { translateX: [-5000, 0] },
            '-0.5' // means 0%-0.5% of $duration
          ],
        },
        $duration: animationDuration,
        $opened: false, //drawer is closed by default for mobile
      },

      tablet: { // tablet animation
        drawer: { // for drawer element
          transform: [
            { translateX: [-drawerWidths[1], 0] }
          ],
        },
        content: { // for content element - change left
          left: [0, drawerWidths[1]]
        },
        $duration: animationDuration,
        $opened: true, //drawer is opened by default for tablet 
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
      zIndex: 3,
      ...(isDesktop || isTablet) ? { display: 'none' } : null,
    },
    drawer: {
      position: 'absolute',
      bottom: 0, top: 0, left: 0,
      zIndex: 5,
      ...isMobile ? { width: drawerWidths[0] } : null,
      ...isTablet ? { width: drawerWidths[1] } : null,
      ...isDesktop ? { width: drawerWidths[2] } : null,
    },
    content: {
      position: 'absolute',
      bottom: 0, top: 0, left: 0, right: 0,
      zIndex: 1,
      ...isDesktop ? { left: drawerWidths[2] } : null,
    },
    openButton: {
      ...isDesktop ? { display: 'none' } : null,
    },
    closeButton: {
      ...(isDesktop || isMobile) ? { display: 'none' } : null,
    },
  }
}

// responsibleDrawer stateless component. 
const responsibleDrawer: TBasic.CodeSFC<TResponsibleDrawer.Shape> = ({ classes, mergeRulesetWithOverrides, children, animations: { sheets: { tablet: animTablet, mobile: animMobile } }, mediaqCode: { mobile: isMobile, tablet: isTablet, desktop: isDesktop }, drawer: drawerNode }) => {

  //const { mobile: isMobile, tablet: isTablet, desktop: isDesktop } = MediaQ.toCode(mediaqCode)

  const openDrawer = () => isTablet ? animTablet.open() : animMobile.open()
  const closeDrawer = () => isTablet ? animTablet.close() : animMobile.close()

  // calling mergeRulesetWithOverrides signals which rulesets are used. So it can use their $overrides to modify other sheet's rulesets
  const root = mergeRulesetWithOverrides(
    classes.root,
  ) as TBasic.ViewRulesetX

  const backDrop = mergeRulesetWithOverrides(
    classes.backDrop,
    isMobile && animMobile.sheet.backDrop, // backDrop animation for mobile
  ) as TBasic.ViewRulesetX

  const drawer = mergeRulesetWithOverrides(
    classes.drawer,
    isMobile && animMobile.sheet.drawer, // drawer animation for mobile
    isTablet && animTablet.sheet.drawer, // drawer animation for tablet
  ) as TBasic.ViewRulesetX

  const content = mergeRulesetWithOverrides(
    classes.content,
    isTablet && animTablet.sheet.content, // content animation for tablet
  ) as TBasic.ViewRulesetX

  const closeButton = mergeRulesetWithOverrides(classes.closeButton) as TBasic.TextRulesetX

  const openButton = mergeRulesetWithOverrides(
    classes.openButton,
    { display: (isTablet && animTablet.opened) || isDesktop ? 'none' : 'flex' }
  ) as TBasic.TextRulesetX

  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onPress={closeDrawer} />
    <AnimatedView key={2} className={drawer}>
      {/* Provider notifies inner Consumer's (i.e. ResponsibleDrawer.LayoutChanged component's) that some of their props changed */}
      <Provider value={{ iconData: MDI.Close, onPress: closeDrawer, style: closeButton }}>
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

//<div>{count++}</div>
//let count = 0

// HOC ResponsibleDrawer component 
export const ResponsibleDrawer = (withStyles<TResponsibleDrawer.Shape>(
  TResponsibleDrawer.Consts.Drawer,
  sheet,
  {
    getVariant: ({ animationDuration, mediaqCode, drawerWidths }) => ({ animationDuration, mediaqCode, drawerWidths }),
    //getVariant: props => { const x = props.mediaqCode; return null },
    variantToString: ({ animationDuration, mediaqCode, drawerWidths }) => variantToString(animationDuration, mediaqCode.mobile, mediaqCode.tablet, mediaqCode.desktop, drawerWidths[0], drawerWidths[1], drawerWidths[2]),
    defaultProps: {
      animationDuration: 300,
      drawerWidths: [250, 250, 300],
      //breakpoints: [480, 1024],
      $mediaq: {
        mobile: [null, 480],
        tablet: [480, 1024],
        desktop: [1024, null],
      }
    }
  }
)(responsibleDrawer)) as AnimationType

ResponsibleDrawer.LayoutChanged = Consumer

//************************************************************************************************************
// Using ResponsibleDrawer in application
//************************************************************************************************************

const button = { color: 'white', fontSize: 28, $web: { cursor: 'pointer' } } as TBasic.RulesetX

//const App: React.SFC = () => <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} drawer={<Drawer/>}>
const App: React.SFC = () => <AppContainer>
  <ResponsibleDrawer drawer={drawer}>
    <Content />
  </ResponsibleDrawer>
</AppContainer>

const Drawer: React.SFC = () => <ScrollView classes={{ container: { flex: 1, backgroundColor: 'lightgray' } }}>
  <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, padding: 10, backgroundColor: 'gray', }}>
    <Text className={{ flexGrow: 1, color: 'white' }}>{LoremIpsum(2)}</Text>
    {/* re-render ResponsibleDrawer.LayoutChanged only when Provider notifies (hide x display it): */}
    <ResponsibleDrawer.LayoutChanged>
      {({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />}
    </ResponsibleDrawer.LayoutChanged>
  </View>
  <Text className={{ padding: 10 }}>{LoremIpsum(80)}</Text>
</ScrollView>

const drawer = <Drawer />

const Content: React.SFC = () => <ScrollView classes={{ container: { flex: 1 } }}> {/* content */}
  <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: 'blue', padding: 10 }}>
    {/* re-render ResponsibleDrawer.LayoutChanged only when Provider notifies (hide x display it): */}
    <ResponsibleDrawer.LayoutChanged>
      {({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />}
    </ResponsibleDrawer.LayoutChanged>
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
