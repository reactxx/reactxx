import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { ScrollView, ViewX, TextX, } from 'muix-primitives'


const sheet = sheetCreator<testAnimation.Shape>(({ transitions, palette }) => ({
  $animations: {
    root: {
      anim1: {
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
        $easing: transitions.easing.sharp,
        $duration: transitions.duration.leavingScreen,
        $delay: 1
      },
      anim2: {

      },
    }
  },
}))

const testAnimation: Muix.CodeSFC<testAnimation.Shape> = props => {
  const { classes, getStyleWithSideEffect, theme, flip, primary, children, style, className, ...rest } = props

  const rootStyles = getStyleWithSideEffect( // getStyleWithSideEffect now knowns, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
    className,
    classes.$animations.root.anim1
  )

  return null
}
//{ch.length == 1 && typeof ch[0] === 'string' ? <TextX className={labelStyles}>{children}</TextX> : children}


const TestStyles = withStyles<testAnimation.Shape>(sheet, { name: 'TestStyles' as any })(testAnimation)

const App: React.SFC = props => <AppContainer>
  <ScrollView classes={{ contentContainerStyle: { backgroundColor: 'yellow' } }}>
    <TestStyles primary>BLUE/YELLOW</TestStyles>
    <TestStyles primary={false}>RED/LIGHTGRAY</TestStyles>
    <TestStyles>GRAY</TestStyles>
    <TestStyles classes={theme => ({ root: { backgroundColor: theme.palette.grey.A100 } })}>
      <TestStyles primary>GREEN/MAROON</TestStyles>
      <TestStyles primary={false}>BLACK/PINK</TestStyles>
      <TestStyles primary classes={theme => ({ label: { color: 'orange' } })}>GREEN/ORANGE</TestStyles>
    </TestStyles>
  </ScrollView>
</AppContainer>

export default App
/*
    <TestStyles primary>BLUE/YELLOW</TestStyles>
    <TestStyles primary={false}>RED/LIGHTGRAY</TestStyles>
    <TestStyles>GRAY</TestStyles>
    <TestStyles classes={theme => ({ root: { backgroundColor: theme.palette.grey.A100 } })}>
      <TestStyles primary>GREEN/MAROON</TestStyles>
      <TestStyles primary={false}>BLACK/PINK</TestStyles>
      <TestStyles primary classes={theme => ({ label: { color: 'orange' } })}>GREEN/ORANGE</TestStyles>
    </TestStyles>
*/