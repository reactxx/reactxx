import React from 'react'

import { TMediaQ } from 'reactxx-mediaq'
import { Types } from 'reactxx-basic'

import { TBasic, TAddIn } from '../typings/basic'

export namespace TTheme {

  export interface WithStyleOptions {
    withTheme?: boolean
    withCascading?: boolean
    withActive?: boolean
  }

  export type PropsXOverwrite<R extends TBasic.Shape> = PartialOverwrite<TBasic.PropsX<R>, {
    style?: TBasic.RulesetX<Types.getStyle<R>>
    classes?: TBasic.PartialSheetX<R>
    className?: TBasic.RulesetX<Types.getStyle<R>>
  }>

  export interface WithStyleOptions_ComponentX<R extends TBasic.Shape =  TBasic.Shape> extends WithStyleOptions {
    getVariant?: (props: TBasic.PropsX<R> & TMediaQ.CodeProps<TBasic.getMediaQ<R>>, theme?: Types.getTheme<R>) => Types.getVariant<R>
    variantToString?: (variant: Types.getVariant<R>) => string
    defaultProps?: PropsXOverwrite<R>
  }

  //export type SheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.SheetX<R> | ((themeX: Types.getTheme<R>, variant: Types.getVariant<R>) => TBasic.SheetX<R>)

  //export type RootRulesetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.RulesetX<Types.getStyle<R>> | ((theme: Types.getTheme<R>, variant: Types.getVariant<R>) => TBasic.RulesetX<Types.getStyle<R>>) //Types.RootRulesetCreatorX<R, TAddInConfig.RulesetAddInX<Types.getStyle<R>, R>>
  //export type PartialSheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.PartialSheetX<R> | ((themeX: Types.getTheme<R>, variant: Types.getVariant<R>) => TBasic.PartialSheetX<R>) //Types.PartialSheetCreatorX<R, TAddInConfig.SheetAddInX<R>>

  //type x = 

  export interface ThemeBase {
    type?: 'ThemeX'
  }
  
  export type ThemeCreator<T extends TTheme.ThemeBase = TTheme.ThemeBase> = T | ((theme: T) => T)
  export type ThemeProviderTyped<T extends TTheme.ThemeBase = TTheme.ThemeBase> = React.ComponentClass<{ theme: ThemeCreator<T> }>
  export interface ThemeContext { theme?: TTheme.ThemeBase; $cache?: {} }

}

const themeContext = React.createContext<TTheme.ThemeContext>({ theme: null, $cache: {} })

export const theme = (input: () => boolean, output: (outputPar: TTheme.ThemeContext) => void, next: () => React.ReactNode) => {
  const render = (renderPar: TTheme.ThemeContext) => {
    output(renderPar)
    return next()
  }
  const res = () => {
    if (input()) return <ThemeConsumer>{render}</ThemeConsumer>
    output(null)
    return next()
  }
  return res
}

export class ThemeProvider extends React.Component<{ theme: TTheme.ThemeCreator }> {

  render() {
    return <themeContext.Consumer>{this.PROVIDER}</themeContext.Consumer>
  }

  PROVIDER = (parentContext: TTheme.ThemeContext) => {
    const { children, theme } = this.props
    const actTheme = typeof theme === 'function' ? theme(parentContext && parentContext.theme) : theme
    if (!this.consumerContext || actTheme !== this.consumerContext.theme)
      this.consumerContext = { theme: actTheme, $cache: {} }
    return <themeContext.Provider value={ this.consumerContext }>{ children }</themeContext.Provider>
  }

  consumerContext: TTheme.ThemeContext
}

export const ThemeConsumer = themeContext.Consumer

export const ThemeProviderUntyped = ThemeProvider as React.ComponentClass<{ theme: any }>

