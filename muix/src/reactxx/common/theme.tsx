import React from 'react'
import { TMediaQ } from 'reactxx-mediaq'

import { TBasic } from '../typings/basic'

export namespace TTheme {

  export interface WithStyleOptions {
    withTheme?: boolean
    withCascading?: boolean
    withActive?: boolean
  }

  export interface WithStyleOptions_Component<R extends TBasic.Shape =  TBasic.Shape> extends WithStyleOptions {
    getVariant?: (props: TBasic.PropsX<R> & TMediaQ.CodeProps<TBasic.getMediaQ<R>>, theme?: TBasic.getTheme<R>) => TBasic.getVariant<R>
    variantToString?: (variant: TBasic.getVariant<R>) => string
    defaultProps?: Partial<TBasic.PropsX<R>>
  }

  export type SheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.SheetX<R> | ((themeX: TBasic.getTheme<R>, variant: TBasic.getVariant<R>) => TBasic.SheetX<R>)
  export type RulesetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.RulesetX<TBasic.getStyle<R>> | ((theme: TBasic.getTheme<R>, variant: TBasic.getVariant<R>) => TBasic.RulesetX<TBasic.getStyle<R>>)
  export type PartialSheetCreatorX<R extends TBasic.Shape = TBasic.Shape> = TBasic.PartialSheetX<R> | ((themeX: TBasic.getTheme<R>, variant: TBasic.getVariant<R>) => TBasic.PartialSheetX<R>)

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

