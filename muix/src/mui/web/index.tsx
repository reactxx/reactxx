import React from 'react'

import hoistNonReactStatics from 'hoist-non-react-statics'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

export * from '../common/createMuiTheme'

//import { sheetToClassNames } from './inline-styles'
import { sheetToClassSheet, rulesetToClassNames } from 'reactxx/web'
import { createMuiTheme } from '../common/createMuiTheme'

import { toPlatformRuleSet, toPlatformSheet, toPlatformEvents } from 'reactxx'
import { ThemeProvider } from 'reactxx'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC = props => <JssProvider jss={jss}><MuiThemeProvider theme={createMuiTheme()}>{props.children}</MuiThemeProvider></JssProvider>

type webKeys<R extends ReactXX.Shape> = ReactXX.getWeb<R> | keyof ReactXX.getCommon<R>

export const muiCompatible = <R extends ReactXX.Shape>(Component: Muix.muiComponentType<ReactXX.getPropsWeb<R>, webKeys<R>>) => {

  const Styled: ReactXX.SFCX<R> = props => {

    const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, modifyThemeState, ...other } = props as (ReactXX.PropsX & ReactXX.OnPressAllX)

    const classes = toPlatformSheet(classesX as ReactXX.SheetX)

    const codeProps = {
      ...other, ...$web,
      style: toPlatformRuleSet(styleX as ReactXX.RulesetX),
      className: rulesetToClassNames(toPlatformRuleSet(classNameX as ReactXX.RulesetX)),
      classes: classes
    }

    toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps as any)

    return <Component {...codeProps as any} />
  }

  return Styled

}
