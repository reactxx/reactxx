import React from 'react'

import hoistNonReactStatics from 'hoist-non-react-statics'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import muiWithStyle from 'material-ui/styles/withStyles'
import muiButton from 'material-ui/Button/Button'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

export * from '../common/createMuiTheme'

//import { sheetToClassNames } from './inline-styles'
import { sheetToClassSheet, rulesetToClassNames } from 'reactxx/web'
import { createMuiTheme } from '../common/createMuiTheme'

import { getDefaultTheme, ThemeContextTypes, OverridesContextTypes, toPlatformRuleSet, toPlatformSheet, AppContainer as ReactXXAppContainer, toPlatformEvents, applyTheme } from 'reactxx' //, MuiThemeProvider } from 'muix-styles'

export const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const AppContainer: React.SFC = props => <JssProvider jss={jss}><ReactXXAppContainer themerProps={{ creator: createMuiTheme }}>{props.children}</ReactXXAppContainer></JssProvider>

type webKeys<R extends Muix.Shape> = ReactXX.getWeb<R> | keyof ReactXX.getCommon<R>

export const muiCompatible = <R extends Muix.Shape>(Component: Muix.muiComponentType<ReactXX.getPropsWeb<R>, webKeys<R>>) => {

  class Styled extends React.PureComponent<ReactXX.PropsX<R>> {
    render() {
      const { classes: classesPropX, style, $web, $native, onPress, onLongPress, onPressIn, onPressOut, className: classNameX, childClasses, ...other } = this.props as ReactXX.PropsX & ReactXX.OnPressAllX
      const theme = this.context.theme || getDefaultTheme()

      const classes = sheetToClassSheet(toPlatformSheet(applyTheme(theme, classesPropX as any)))

      const codeProps = {
        ...other, ...$web,
        theme: theme,
        style: toPlatformRuleSet(applyTheme(theme, style)),
        className: rulesetToClassNames(applyTheme(theme, classNameX)),
        classes: classes
      } //as any //ReactXX.getPropsWeb<R> & webKeys<R>

      toPlatformEvents($web, $native as ReactXX.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps as any)

      return <Component {...codeProps as any}/>
    }
    static contextTypes = { ...ThemeContextTypes }
  }

  const Styled_: ReactXX.SFCX<R> = (props, context: Muix.MuiThemeContextValue) => {
    const { classes: _classes, style, $web, $native, onClick, className: rulesetX, ...rest } = props as ReactXX.PropsX<Muix.Shape> & ReactXX.OnPressAllWeb 

    const click = ($web && $web.onClick) || onClick

    const theme = context.theme || getDefaultTheme()

    const cn = (typeof rulesetX == 'function' ? rulesetX(theme) : rulesetX) as React.CSSProperties

    const classes = null //sheetToClassSheet((classesToPlatformSheet(theme, _classes as Muix.ThemeValueOrCreator<ReactXX.PartialSheetX<R>>)) as ReactXX.SheetWeb<R>)
    const webProps = null //{ ...rest, ...$web, style: toPlatformRuleSet(style), classes, onClick: click, theme, className: rulesetToClassNames(cn) } as ReactXX.getPropsWeb<R>
    return <Component {...webProps} />
  }
  return Styled
}
