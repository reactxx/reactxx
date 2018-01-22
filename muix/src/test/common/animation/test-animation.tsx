import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { View, Text, AnimatedView } from 'muix-primitives'

//import { Animated } from 'react-native'
//const AnimatedView: React.ComponentClass<ReactN.ViewProperties> = Animated.View
//const AnimatedView: React.ComponentClass<ReactN.ViewProperties> = View

import { keyFrameToClassNames } from 'muix-styles/web'

//const keyframeName = keyFrameToClassNames({
//  '0%': { transform: 'translateX(-5000px)' },
//  '1%': { transform: 'translateX(0px)' },
//  '100%': { transform: 'translateX(0px)' },
//})

//const keyframeName2 = keyFrameToClassNames({
//  '0%': { transform: 'translateX(-5000px)' },
//  '1%': { transform: 'translateX(0px)' },
//  '100%': { transform: 'translateX(0px)' },
//})

//const keyframeName3 = keyFrameToClassNames({
//  '0%': { transform: 'translateX (-5000px)' },
//  '1%': { transform: 'translateX (0px)' },
//  '100%': { transform: 'translateX (0px)' },
//})

//alert([keyframeName, keyframeName2, keyframeName3])

const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({ 
  $animations: { // different Animations
    animDrawer: { // single Animation (single Animated.Value for NATIVE)
      slide: { // animation ruleset
        transform: [
          { translateX: [-200, 0] }
        ],
        //$native: {
        //  transform: [
        //    { translateX: [-300, 0] },
        //  ]
        //},
        //$web: { //the same as { translateX: [0, -200] }
        //  transform: ['translateX(0px)', 'translateX(-200px)']
        //},
      },
      opacity: {
        opacity: [0, 0.4],
        //width: [0, 0.4, '-40'],
        //height: [0, 0.4, '40-'],
        //left: [0, 0.4, '10-70'],
        transform: [
          { translateX: [-5000, 0] },
          //{ translateY: [10, 0] },
          '-1'
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
    position: 'relative',
    backgroundColor: 'white', //without background does not work zIndex in Native
  },
  backDrop: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 1
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: 200,
    backgroundColor: 'lightgreen',
    zIndex: 5
  },
  button: {
    position: 'absolute',
    right: 0,
    width: 300,
    backgroundColor: 'yellow',
    marginTop: 24,
    zIndex: 11
  }
}))

class testAnimation extends React.Component<Muix.CodeProps<testAnimation.Shape>> {
  render() {
    const { classes, getStyleWithSideEffect, theme, flip, children, style, className, animations, ...rest } = this.props

    const root = getStyleWithSideEffect( // calling getStyleWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      classes.root,
      className,
    ) as ReactN.ViewStyle
    const backDrop = getStyleWithSideEffect( // calling getStyleWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      classes.backDrop,
      animations.animDrawer.sheet.opacity
    ) as ReactN.ViewStyle
    const drawer = getStyleWithSideEffect( // getStyleWithSideEffect now knows, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
      classes.drawer,
      animations.animDrawer.sheet.slide
    ) as ReactN.ViewStyle
    const button = getStyleWithSideEffect(classes.button) as ReactN.TextStyle

    //console.log('======================================================\n', root, classes.button, backDrop, drawer)
    return <View key={1} className={root}>
      <AnimatedView key={1} style={backDrop} />
      <Text key={2} className={button} onClick={() => animations.animDrawer.toggle()}>DO DRAWER</Text>
      <AnimatedView key={3} style={drawer} />
      <Text key={4}>asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf asdf asdf asdf asd f assdf </Text>
    </View>
    //return <AnimatedView key={1} style={rootStyles}>
    //  <AnimatedView key={3} style={drawerStyles} />
    //</AnimatedView>
  }
}

const TestAnimation = withStyles<testAnimation.Shape>(sheet, { name: 'TestAnimation' as any })(testAnimation)

const App: React.SFC = props => <View style={{ flex: 1 }}>
  <TestAnimation />
</View>

export default App

//      <Text key={2} className={{ position: 'absolute', right: 0, width: 300, backgroundColor: 'yellow' }} onClick={() => animations.animDrawer.toggle()}>DO DRAWER</Text>


