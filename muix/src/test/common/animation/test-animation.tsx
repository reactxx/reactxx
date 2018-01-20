import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { View, Text } from 'muix-primitives'

const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({
  $animations: { //AnimationSheet
    animDrawer: { //Animations
      slide: { //Animation
        opacity: [0.5, 1],
        //backgroundColor: ['green', 'red'],
        transform: [
          { translateX: [0, -200] }
        ],
        $native: {
          transform: [
            { translateX: [0, -100] },
            //{ translateY: [0, 100] },
            //{ scale: [20, 0, 1] }
          ]
        },
        //$web: {
        //  transform: ['translate(0px, 0px) scale(20) skew(-20deg)', 'translate(200px, 100px) scale(0) skew(0)']
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
    backgroundColor: 'gray'
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

class testAnimation extends React.Component<Muix.CodeProps<testAnimation.Shape>> {
  render() {
    const { classes, getStyleWithSideEffect, theme, flip, children, style, className, getAnimations, ...rest } = this.props

    const animations = getAnimations()

    const rootStyles = getStyleWithSideEffect( // getStyleWithSideEffect now knows, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
      classes.root,
      className,
      animations.drivers.animDrawer.className.opacity
    ) as ReactN.ViewStyle
    const drawerStyles = getStyleWithSideEffect( // getStyleWithSideEffect now knows, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
      classes.drawer,
      animations.drivers.animDrawer.className.slide //.root.className.anim1
    ) as ReactN.ViewStyle

    return <div key={1} style={rootStyles}>
      <div key={2} style={{ position: 'absolute', right: 0, width: 300, backgroundColor: 'yellow' }} onClick={() => animations.drivers.animDrawer.toggle()}>DO DRAWER</div>
      <div key={3} style={drawerStyles}/>
    </div>
  }
}
let count = 0 
//{ch.length == 1 && typeof ch[0] === 'string' ? <TextX className={labelStyles}>{children}</TextX> : children}
//let x: Muix.PartialSheetX<testAnimation.Shape>


const TestAnimation = withStyles<testAnimation.Shape>(sheet, { name: 'TestAnimation' as any })(testAnimation)

const App: React.SFC = props => <View style={{ flex: 1 }}>
  <TestAnimation />
</View>

export default App
/*
    <TestAnimation primary>BLUE/YELLOW</TestAnimation>
    <TestAnimation primary={false}>RED/LIGHTGRAY</TestAnimation>
    <TestAnimation>GRAY</TestAnimation>
    <TestAnimation classes={theme => ({ root: { backgroundColor: theme.palette.grey.A100 } })}>
      <TestAnimation primary>GREEN/MAROON</TestAnimation>
      <TestAnimation primary={false}>BLACK/PINK</TestAnimation>
      <TestAnimation primary classes={theme => ({ label: { color: 'orange' } })}>GREEN/ORANGE</TestAnimation>
    </TestAnimation>
*/