import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { ScrollView, ViewX, TextX, } from 'muix-primitives'


const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({
  $animations: { //AnimationSheet
    root: { //Animations
      anim1: { //Animation
        opacity: [0, 1],
        backgroundColor: ['green', 'red'],
        transform: [
          { perspective: [0, 0] }
        ],
        $native: {
          transform: [
            { translateX: [0, 200] },
            { translateY: [0, 100] },
            { scale: [20, 0, 1] }
          ]
        },
        $web: {
          transform: ['translate(0px, 0px) scale(20) skew(-20deg)', 'translate(200px, 100px) scale(0) skew(0)']
        },
      },
      anim2: {

      },
      $easing: transitions.easing.sharp,
      $duration: transitions.duration.leavingScreen,
      $delay: 1
    }
  },
  root: {}
}))

const testAnimation: Muix.CodeSFC<testAnimation.Shape> = props => {
  const { classes, getStyleWithSideEffect, theme, flip, primary, children, style, className, getAnimations, ...rest } = props

  const animations = getAnimations()

  const rootStyles = getStyleWithSideEffect( // getStyleWithSideEffect now knows, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
    classes.root,
    className,
    animations.drivers.root.className.anim1 //.root.className.anim1
  )

  return null
}
//{ch.length == 1 && typeof ch[0] === 'string' ? <TextX className={labelStyles}>{children}</TextX> : children}
//let x: Muix.PartialSheetX<testAnimation.Shape>


const TestAnimation = withStyles<testAnimation.Shape>(sheet, { name: 'TestAnimation' as any })(testAnimation)

const App: React.SFC = props => <AppContainer>
  <ScrollView classes={theme => ({ contentContainerStyle: { backgroundColor: 'yellow' } })}>
    <TestAnimation primary>BLUE/YELLOW</TestAnimation>
    <TestAnimation primary={false}>RED/LIGHTGRAY</TestAnimation>
    <TestAnimation>GRAY</TestAnimation>
    <TestAnimation classes={theme => ({ root: { backgroundColor: 'yellow' } } )}>
      <TestAnimation primary>GREEN/MAROON</TestAnimation>
      <TestAnimation primary={false}>BLACK/PINK</TestAnimation>
    </TestAnimation>
  </ScrollView>
</AppContainer>

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