import ReactN from 'react-native'

import { TAddInConfig } from 'typescript-config'
import { TBasic, TComps } from 'reactxx-basic/typings'


import { TTheme } from './theme'
import { TAnimation } from './animation'
import { TMediaQ } from './media-q'

export namespace TSheets {

  export type MouseEvent = (event?: React.MouseEvent<Element>) => void
  export interface OnPressX { onPress?: MouseEvent; onLongPress: () => void }
  export interface OnPressAllX extends OnPressX { onPressIn?: MouseEvent; onPressOut?: MouseEvent }
  export interface OnPressAllWeb { onClick?: React.MouseEventHandler<Element>; onMouseDown?: React.MouseEventHandler<Element>; onMouseUp?: React.MouseEventHandler<Element> }
  export interface OnPressAllNative { onPress: () => void; onPressIn: () => void; onPressOut: () => void; onLongPress: () => void }

  export interface WithStylesOptionsNew<TName extends (string | null) = null> {
    name: keyof Shapes
    flip?: boolean
  }

  /******************************************
    RULESET
  *******************************************/

  //*************** cross platform ruleset for web and native

  export type RulesetX<T extends TBasic.RulesetNativeIds = 'Text', R extends Shape = Shape> = TBasic.RulesetX<T,R>

  export type ViewRulesetCommonX = TBasic.ViewRulesetCommonX

  export type ViewRulesetX = TBasic.ViewRulesetX
  export type TextRulesetX = TBasic.TextRulesetX

  //******************** Platform specific ruleset
  export type RulesetWeb = React.CSSProperties //??? https://github.com/programbo/cssproperties/blob/master/css-properties.d.ts
  export type RulesetNative = ReactN.TextStyle | ReactN.ViewStyle | ReactN.ImageStyle | ReactN.ScrollViewStyle
  export type Ruleset = RulesetNative | RulesetWeb

  /******************************************
    COMPONENT SHAPE
  *******************************************/
  export interface Shape extends TBasic.Shape {
    //**** export type of component name
    nameType?: string | null
    //**** animation shape
    animation?: TAnimation.Shapes
    //**** mediaq shape
    mediaq?: TMediaQ.Shape | null
    //**** component theme par
    compTheme?: {}
  }

  //export interface ShapesLow { [name: string]: Shape } 
  export interface Shapes { }

  //******************** Helpers for Shape.common and Shape.native definitin
  export type ShapeTexts<P extends string> = TComps.ShapeTexts<P>
  export type ShapeViews<P extends string> = TComps.ShapeViews<P>
  export type ShapeScrollViews<P extends string> = TComps.ShapeScrollViews<P>
  export type ShapeImages<P extends string> = TComps.ShapeImages<P>
  export type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
    common: {}; native: {}; web: null
    style: 'View'//ReactN.ViewStyle
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    animation: {}; mediaq: null,
    nameType: null
    compTheme: never
  }, R>

  //******************** Shape getters
  export type getCommon<R extends TBasic.Shape> = R['common']
  export type getNative<R extends TBasic.Shape> = R['native']
  export type getWeb<R extends TBasic.Shape> = R['web']
  export type getStyle<R extends TBasic.Shape> = R['style']
  export type getProps<R extends TBasic.Shape> = R['props']
  export type getPropsWeb<R extends TBasic.Shape> = R['propsWeb']
  export type getPropsNative<R extends TBasic.Shape> = R['propsNative']

  export type getAnimation<R extends Shape> = R['animation']
  export type getNameType<R extends Shape> = R['nameType']
  export type getCompTheme<R extends Shape = Shape> = R['compTheme']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']

  /******************************************
    COMPONENT SHEET
  *******************************************/

    export type SheetX<R extends Shape = Shape> = TBasic.SheetX<R>
  export type PartialSheetX<R extends Shape = Shape> = TBasic.PartialSheetX<R>

  //Cross platform sheet helpers
  export type SheetXCommon<R extends Shape> = TBasic.SheetXCommon<R>
  export type SheetXNative<R extends Shape> = TBasic.SheetXNative<R>
  export type SheetXWeb<R extends Shape> = TBasic.SheetXWeb<R>

  //******************** Platform specific sheets
  export type SheetWeb<R extends Shape = Shape> = TBasic.SheetWeb<R>
  export type SheetNative<R extends Shape = Shape> = TBasic.SheetNative<R>
  export type Sheet<R extends Shape = Shape> = TBasic.Sheet<R>
  export type PartialSheet<R extends Shape> = TBasic.PartialSheet<R>


  //******************** Ruleset Merge
  export type MergeRulesetWithOverrides = (...rulesets: TAddInConfig.RulesetWithAddIn[]) => Ruleset
  export type MergeRulesetWithOverridesNative = (...rulesets: (TAddInConfig.RulesetWithAddInNative | ReactN.TextStyle)[]) => RulesetNative
  export type MergeRulesetWithOverridesWeb = (...rulesets: TAddInConfig.RulesetWithAddInWeb[]) => RulesetWeb


  /******************************************
    ALL SHEETS
  *******************************************/
  export type SheetsWeb = { [P in keyof Shapes]?: SheetWeb<Shapes[P]> }
  export type SheetsNative = { [P in keyof Shapes]?: SheetNative<Shapes[P]> }
  export type Sheets = { [P in keyof Shapes]?: Sheet<Shapes[P]> }


  /******************************************
     COMPONENT TYPING
  *******************************************/

  //******************** cross platform Component props (Component is created by 'withStyles' ) 

  export type PropsX<R extends Shape = Shape> = TBasic.PropsX<R>
  export type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>
  export type SFCX<R extends Shape> = React.SFC<PropsX<R>>

  //******************** Component's code (passed to withStyles)

  // component code for web
  export type CodePropsWeb<R extends Shape = Shape> = TBasic.CodePropsWeb<R>
  export type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>

  // component code for native
  export type CodePropsNative<R extends Shape = Shape> = TBasic.CodePropsNative<R>
  export type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>
  export type CodeComponentNative<R extends Shape> = React.ComponentClass<CodePropsNative<R>>

  //some code for components could be shared for web and native
  export type CodeProps<R extends Shape = Shape> = TBasic.CodeProps<R>
  export type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>
  export type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>
  export type CodeComponentType<R extends Shape> = React.ComponentType<CodeProps<R>>

  //******************** $props in rulesets
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<getProps<R>, {
    $web?: Partial<getPropsWeb<R>> //web specific style
    $native?: Partial<getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    childClasses?: never
    className?: never
  }>>

  export type PropsInRulesetWeb<R extends Shape = Shape> = getProps<R> & getPropsWeb<R>
  export type PropsInRulesetNative<R extends Shape = Shape> = getProps<R> & getPropsNative<R>
  export type PropsInRuleset<R extends Shape = Shape> = getProps<R> & (getPropsNative<R> | getPropsWeb<R>)

}
