import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { View } from 'muix-primitives'
import { Animated, Text } from 'react-native'

const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({
  $animations: { // different Animations
    animDrawer: { // single Animation (single Animated.Value for NATIVE)
      slide: { // animation ruleset
        opacity: [0.5, 1],
        transform: [
          { translateX: [0, -200] }
        ],
        $native: {
          transform: [
            { translateX: [0, -200] },
          ]
        },
        //$web: { //the same as { translateX: [0, -200] }
        //  transform: ['translateX(0px)', 'translateX(-200px)']
        //},
      },
      opacity: {
        opacity: [0.5, 1],
      },
      $easing: transitions.easing.sharp,
      $duration: 500,
      $opened: true
    }
  },
  root: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'gray',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    width: 200,
    backgroundColor: 'lightgreen'
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 300,
    height: 50,
    backgroundColor: 'yellow'
  }
}))

const AnimatedView: React.ComponentClass<ReactN.ViewProperties> = Animated.View

class testAnimation extends React.Component<Muix.CodeProps<testAnimation.Shape>> {
  value = new Animated.Value(0)
  render() {
    const { classes, getStyleWithSideEffect, theme, flip, children, style, className, animations, ...rest } = this.props

    const rootStyles = getStyleWithSideEffect( // calling getStyleWithSideEffect signals which rulesets are used. So it can use their $overrides and $childOverrides props to modify self sheet and child sheets
      classes.root,
      className,
      animations.animDrawer.sheet.opacity
    ) as ReactN.ViewStyle
    const drawerStyles = getStyleWithSideEffect( // getStyleWithSideEffect now knows, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
      classes.drawer,
      animations.animDrawer.sheet.slide
    ) as ReactN.ViewStyle
    console.log(rootStyles) 
    return <AnimatedView key={1} style={rootStyles}>
      <Text key={2} style={{ position: 'absolute', right: 0, width: 300, backgroundColor: 'yellow', marginTop:24 }} onPress={() => animations.animDrawer.toggle()}>DO DRAWER</Text>
      <AnimatedView key={3} style={drawerStyles}/>
    </AnimatedView>
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
