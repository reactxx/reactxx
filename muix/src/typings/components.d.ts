import React from 'react';
import { TEngine, TTyped, TExtensions } from 'reactxx-typings';

declare namespace TComponents {

  //******************** Cross platform component props
  type Props<R extends TTyped.Shape = TTyped.Shape> =
    TTyped.getProps<R> &
    PropsLow<R>

  interface PropsLow<R extends TTyped.Shape> extends TTyped.RootProps<R> {
    className?: TTyped.RulesetOrCreator<R>
    style?: TTyped.StyleOrCreator<R>
    classes?: TTyped.PartialSheetOrCreator<R> // cross platform sheet
    themedProps?: (theme: TTyped.getTheme<R>) => Props<R>
  }

  type SFC<R extends TTyped.Shape = TTyped.Shape> = React.SFC<Props<R>>

  //*************************************** */  
  // CONFIGS
  //*************************************** */  

  interface ComponentConfig<R extends TTyped.Shape = TTyped.Shape> extends TExtensions.ComponentConfig {
    // withCascaing?: boolean
    displayName?: string
    $props?: Partial<Props<R>> // classes, css and styles are  ignored
    $sheet?: TTyped.SheetOrCreator<R>
  }

  type ComponentConfigs<R extends TTyped.Shape = TTyped.Shape> = ComponentConfig<R> | ComponentConfig<R>[]

  interface Config<R extends TTyped.Shape = TTyped.Shape> extends TExtensions.Config {
    componentId?: number // generated unique component type Id
    displayName?: string
    $props?: Partial<Props<R>>[] // classes, css and styles are  ignored
    $sheet?: TEngine.Sheet[]
  }

  type ThemeContext<T extends any> = [T, (newTheme: T) => void]

  type ComponentCreator<R extends TTyped.Shape = TTyped.Shape> = (
    userConfig?: ComponentConfigs<R>
  ) => React.SFC<Props<R>>

  type GetComponent<R extends TTyped.Shape> = (
    useStyles: UseStyles<R>,
    par?
  ) => SFC<R>

  type UseStyles<R extends TTyped.Shape = TTyped.Shape> = (
    props: Props<R>,
  ) => UseStylesResult<R>

  type UseStylesExtension<R extends TTyped.Shape = TTyped.Shape> = (
    props: Props<R>,
    config: Config,
    oldResult: UseStylesResult<R>
  ) => UseStylesResult<R>


  interface UseStylesResult<R extends TTyped.Shape> {
    propsCode: TTyped.PropsCode<R>
    classes: TTyped.getSheet<R>
    className: TTyped.getRootStyle<R>
    style: TTyped.getRootStyle<R>
    getWidthMap: (mapBreakpoints?: number[]) => boolean[]
    getNativeStyleProps: <R extends TTyped.RulesetIds>(...rulesets: TTyped.TAllowed<R>[]) => TTyped.StylePropsNative<R>
    getRootNativeStyleProps: <R extends TTyped.CommonIds = "">(...rulesets: TTyped.TAllowed<R>[]) => TTyped.TNativeIdToProps<R>
    getWebStyleProps: (...rulesets: TTyped.RulesetIds[]) => TTyped.StylePropsWeb
    getRootWebStyleProps: (...rulesets: TTyped.RulesetIds[]) => TTyped.StylePropsWeb
  }

} 