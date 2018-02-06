import React from 'react'
import ReactDOM from 'react-dom'

import { withStyles, sheetCreator } from 'muix-styles'
import { View, Text, AnimatedView } from 'muix-primitives'

const debugDuration = 300

const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({
  $animations: { // different Animations
    mobile: { // single Animation (single Animated.Value for NATIVE)
      drawer: { // animation ruleset for specific component
        transform: [
          { translateX: [-200, 0] }
        ],
      },
      backDrop: {
        opacity: [0, 0.4],
        transform: [
          { translateX: [-5000, 0] },
          '0%-0.5%' // the same as shortcut '-0.5'
        ],
      },
      $easing: transitions.easing.sharp,
      $duration: debugDuration,
      $opened: false,
    },
    tablet: {
      drawer: {
        transform: [
          { translateX: [-200, 0] }
        ],
      },
      content: {
        left: [0, 200]
      },
      $easing: transitions.easing.sharp,
      $duration: debugDuration,
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
    bottom: 0, top: 0, left:0, width: 200,
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
    }
  },
  tablet: {
    $overrides: {
      backDrop: { display: 'none' },
    }
  },
  desktop: {
    $overrides: {
      closeButton: { display: 'none' },
      openButton: { display: 'none' },
      backDrop: { display: 'none' },
      content: { left: 200 }
    }
  },
  openButton: {},
  closeButton: {},
}))

const btnStyle = {color: 'blue', padding: 10}

const drawerLayout: Prim5s.CodeSFC<testAnimation.Shape> = props => {
  const { classes, getStyleWithSideEffect, theme, flip, children, style, className, animations, mobile, tablet, desktop, ...rest } = props

  const open = () => tablet ? animations.tablet.open() : animations.mobile.open()
  const close = () => tablet ? animations.tablet.close() : animations.mobile.close()
  const opened = tablet && animations.tablet.opened || mobile && animations.mobile.opened || desktop

  const root = getStyleWithSideEffect( // calling getStyleWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
    classes.root,
    mobile && classes.mobile,
    tablet && classes.tablet,
    desktop && classes.desktop,
    className,
  ) as ReactN.ViewStyle

  const backDrop = getStyleWithSideEffect(
    classes.backDrop,
    mobile && animations.mobile.sheet.backDrop,
  ) as ReactN.ViewStyle

  const drawer = getStyleWithSideEffect(
    classes.drawer,
    mobile && animations.mobile.sheet.drawer,
    tablet && animations.tablet.sheet.drawer,
  ) as ReactN.ViewStyle

  const content = getStyleWithSideEffect(
    classes.content,
    tablet && animations.tablet.sheet.content,
  ) as ReactN.ViewStyle

  //console.log('### DRAWER STATE opened=', opened(), ', mobile(is-opened)=', mobile, animations.mobile.opened, ', tablet=(is-opened)', tablet, animations.tablet.opened, ) 
  //console.log('======================================================\n', root, classes.button, backDrop, drawer) 
  return <View className={root}>
    <AnimatedView key={1} className={backDrop} onClick={close} >
      <Text style={{ marginTop:60 }}>{JSON.stringify(backDrop, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={2} className={drawer}>
      <Text className={getStyleWithSideEffect(classes.closeButton, { ...btnStyle, textAlign: 'right' })} onClick={close} >CLOSE</Text>
      <Text style={{ marginTop: 60 }}>{JSON.stringify(drawer, null, 2)}</Text>
    </AnimatedView>
    <AnimatedView key={3} className={content}>
      <View key={1} className={getStyleWithSideEffect(classes.openButton, { flexDirection: 'row', display: opened ? 'none' : 'flex' })} >
        <Text onClick={open} className={{ ...btnStyle, alignSelf: 'flex-start' }}>OPEN</Text>
      </View>
      <Text style={{ marginTop: 120 }}>{JSON.stringify(content, null, 2)}'\n'{JSON.stringify(content.left, null, 2)}</Text>
    </AnimatedView>
  </View>
}
const DrawerLayout = withStyles<testAnimation.Shape>(sheet, { name: 'TestAnimation' as any })(drawerLayout)

class App extends React.Component {
  state = { mobile: true, tablet: false, desktop: false }
  render() {
    const initState = { mobile: false, tablet: false, desktop: false }
    return <View className={{ flex: 1, $native: { marginTop: 24 } }}>
      <View className={{ flexDirection: 'row' }}>
        <Text onClick={() => this.setState({ ...initState, mobile: true })} style={btnStyle}>MOBILE</Text>
        <Text onClick={() => this.setState({ ...initState, tablet: true })} style={btnStyle}>TABLET</Text>
        <Text onClick={() => this.setState({ ...initState, desktop: true })} style={btnStyle}>DESKTOP</Text>
      </View>
      <DrawerLayout {...this.state} />
    </View>
  }
}
export default App
