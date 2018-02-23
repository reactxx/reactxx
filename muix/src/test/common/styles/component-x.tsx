import React from 'react'
import ReactDOM from 'react-dom'
import { fade } from 'material-ui/styles/colorManipulator'

import { withStyles, sheetCreator, AppContainer, MuiThemeProvider, } from 'muix-styles'
import { ScrollView, ViewX, TextX, } from 'muix-primitives'


const sheet = sheetCreator<testStyles.Shape>(({ palette, typographyX: typoX }) => ({
  root: {
    minWidth: 150, margin: 10, padding: 10,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: palette.grey.A200,
    $childOverrides: {
      TestStyles: {
        primary: {
          backgroundColor: 'green',
          $overrides: {
            //the same as "label: {color: 'maroon'}"
            label: {
              $web: {
                color: 'maroon'
              },
              $native: {
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
  $animations: {}
}))

const testStyles: ReactXX.CodeSFC<testStyles.Shape> = props => {
  const { classes, mergeRulesetWithOverrides, theme, primary, children, style, className, animations, ...rest } = props

  const rootStyles = mergeRulesetWithOverrides( // getRulesetWithSideEffect now knowns, which rulesets are actualy used. So it can use their $overrides and $childOverrides props
    classes.root,
    primary === true && classes.primary,
    primary === false && classes.secondary,
    className,
  )

  const labelStyles = mergeRulesetWithOverrides(
    classes.label,
  )

  const ch = React.Children.toArray(children)

  return <ViewX className={rootStyles} style={style}>
    {ch.length == 1 && typeof ch[0] === 'string' ? <TextX className={labelStyles}>{children}</TextX> : children}
  </ViewX>
}
//{ch.length == 1 && typeof ch[0] === 'string' ? <TextX className={labelStyles}>{children}</TextX> : children}


const TestStyles = withStyles<testStyles.Shape>(sheet, { name: 'TestStyles' as any })(testStyles)

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