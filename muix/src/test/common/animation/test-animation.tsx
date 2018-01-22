import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { View, Text, AnimatedView } from 'muix-primitives'

import { keyFrameToClassNames } from 'muix-styles/web'

const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({ 
  $animations: { // different Animations
    mobile: { // single Animation (single Animated.Value for NATIVE)
      drawer: { // animation ruleset
        transform: [
          { translateX: [-200, 0] }
        ],
      },
      backDrop: {
        opacity: [0, 0.4],
        transform: [
          { translateX: [-5000, 0] },
          '-1' // shortcut for 0%-1%. Another possibility: 30- (shortcut for 30%-100%), 30-60 (shortcut for 30%-60%)
        ],
      },
      $easing: transitions.easing.sharp,
      $duration: 300,
      $opened: false,
      //$delay: 2000
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
    bottom: 0, top: 0, width: 200,
    backgroundColor: 'lightgreen',
    zIndex: 5
  },
  content: {
    position: 'absolute',
    bottom: 0, top: 0, left: 0, right: 0,
    zIndex: 1
  },
}))

class testAnimation extends React.Component<Muix.CodeProps<testAnimation.Shape>> {
  render() {
    const { classes, getStyleWithSideEffect, theme, flip, children, style, className, animations, ...rest } = this.props

    const root = getStyleWithSideEffect( // calling getStyleWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      classes.root,
      className,
    ) as ReactN.ViewStyle
    const backDrop = getStyleWithSideEffect( 
      classes.backDrop,
      animations.mobile.sheet.backDrop
    ) as ReactN.ViewStyle
    const drawer = getStyleWithSideEffect( 
      classes.drawer,
      animations.mobile.sheet.drawer
    ) as ReactN.ViewStyle
    const content = getStyleWithSideEffect(
      classes.content,
    ) as ReactN.ViewStyle

    //console.log('======================================================\n', root, classes.button, backDrop, drawer)
    return <View key={1} className={root} style={{ $native: { marginTop:24 } }}>
      <AnimatedView key={1} className={backDrop} onClick={() => animations.mobile.close()} />
      <AnimatedView key={3} className={drawer} />
      <View key={4} className={content}>
        <Text key={2} onClick={() => animations.mobile.toggle()} style={{ textAlign: 'right' }}>DO DRAWER</Text>
        <Text>asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf </Text>
      </View>
    </View>
  }
}

const TestAnimation = withStyles<testAnimation.Shape>(sheet, { name: 'TestAnimation' as any })(testAnimation)

const App: React.SFC = props => <View style={{ flex: 1 }}>
  <TestAnimation />
</View>

export default App
