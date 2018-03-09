//https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js
declare namespace ReactXX {

  const enum Consts {
    //themePropName = 'theme',
    themeXPropName = 'theme'
  }

  //type ThemePars = { [name: string]: {} }
  //type OverridesX = { [name: string]: PartialSheetCreatorX }

  type PartialSheetCreatorX<R extends Shape = Shape> = PartialSheetX<R> | ((themeX: ThemeX, themePar: getThemePar<R>) => PartialSheetX<R>)
  type SheetCreatorX<R extends Shape = Shape> = SheetX<R> | ((themeX: ThemeX, themePar: getThemePar<R>) => SheetX<R>)
  type ThemeParCreatorX<R extends Shape = Shape> = getThemePar<R> | ((themeX: ThemeX) => getThemePar<R>)
  type RulesetCreatorX<R extends Shape = Shape> = RulesetX<getStyle<R>> | ((theme: ThemeX, themePar: getThemePar<R>) => RulesetX<getStyle<R>>)

  interface Theme {
    type: 'Theme'
    //direction: Direction
    //components?: ComponentsTheme
    //themePars: ThemePars
    //overridesNew?: FromThemeValueOrCreator<Sheets>
  }
  type ThemeX = Partial<Overwrite<Theme, { type: 'ThemeX'}>>

  interface ThemeOptionsX {
  }

  //type Direction = 'ltr' | 'rtl';

  //type ThemeContextValue = { theme: Theme }
  //interface ThemeStatesX { theme: Theme; overrides?: OverridesX }

  interface ThemeCompX<R extends Shape = Shape> { override?: PartialSheetX<R>, themePar?: getThemePar<R> }
  interface ThemeCompSelectedX<R extends Shape = Shape> extends ThemeCompX<R> { theme: ThemeX }

  interface ThemeCompCreatorX<R extends Shape = Shape> { override?: PartialSheetCreatorX<R>, par?: ThemeParCreatorX<R> }

  type ThemeState = { [Consts.themeXPropName]: ThemeX } & {[P in keyof Shapes]?: ThemeCompX<Shapes[P]> }
  type ThemeModifier = (state: ThemeState) => ThemeState

  //type ThemeStateX<R extends Shape = Shape> = { theme: Theme; override?: PartialSheetX<R> }
  
  //interface ThemerProps {
  //  creator: ThemeCreator
  //  defaultOptions?: ThemeOptionsX
  //}

  //type ThemeCreator = (options?: ThemeOptionsX) => Theme

  interface ThemeProviderProps { theme: Theme | ((theme: Theme) => Theme) }
  //interface AppContainerProps { themerProps: ThemerProps }


}
