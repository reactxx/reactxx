import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { ScrollView, View, Text,  } from 'muix-primitives'
import withStyles from '../../styles/common/withStyles'
import { rulesetToClassNames } from 'muix-styles/web'

const sheet = sheetCreator<testStyles.Shape>(({ palette, typography: type }) => ({
  root: {
    width: 180, height: 50, margin: 10, padding:10,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    backgroundColor: palette.grey.A200,
    $childOverrides: { 
      TestStyles: {
        primary: {
          backgroundColor: 'green',
          $overrides: {
            label: {
              $web: {
                color: 'maroon'
              }
            }
          }
        },
        secondary: {
          backgroundColor: 'black',
          $overrides: {
            label: { color: 'pink' }
          }
        },
      }
    }
  },
  primary: {
    backgroundColor: palette.primary[500],
    $overrides: {
      label: { color: 'yellow' }
    }
    
  },
  secondary: {
    backgroundColor: palette.secondary[500],
    $overrides: {
      label: { color: 'lightgray' }
    }
  },
  label: {
    color: palette.common.white
  },
  rootNative: { },
  textNative: { },
  webText: {}
}))

const testStyles: Muix.CodeSFCWeb<testStyles.Shape> = props => {
  const { classes, getStyleWithSideEffect, theme, flip, innerRef, primary, children, style, ...rest } = props

  const rootStyles = getStyleWithSideEffect( // getStyleWithSideEffect now knowns, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
    classes.root,
    primary === true && classes.primary,
    primary === false && classes.secondary,
  )

  const labelStyles = getStyleWithSideEffect(
    classes.label,
  )
  return <div className={rulesetToClassNames(rootStyles)} style={style} {...rest}>
    <div className={rulesetToClassNames(labelStyles)}>
      {children}
    </div>
  </div>
}


const TestStyles = withStyles<testStyles.Shape>(sheet, { name: 'TestStyles' as any })(testStyles)

const App: React.SFC = props => <AppContainer>
  <ScrollView>
    <TestStyles primary>BLUE/YELLOW</TestStyles>
    <TestStyles primary={false}>RED/LIGHTGRAY</TestStyles>
    <TestStyles>GRAY/WHITE</TestStyles>
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