import ReactN from 'react-native'

import { TAnimation } from 'reactxx-animation'

import { TAddInConfig } from './add-in'
import { TBasic } from './basic'
import { TMediaQ } from './media-q'

export namespace TSheets {

  export interface WithStylesOptionsNew<TName extends (string | null) = null> {
    name: keyof Shapes
    flip?: boolean
  }

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

  export interface Shapes { }

  //******************** Helpers for Shape.common and Shape.native definitin
  export type OverwriteShape<R extends Partial<Shape>> = Overwrite<{
    common: {}; native: {}; web: null
    style: 'View'
    props: {}; propsNative: ReactN.ViewProperties; propsWeb: React.HTMLAttributes<HTMLElement>
    animation: {}; mediaq: null,
    nameType: null
    compTheme: never
  }, R>

  //******************** Shape getters
  export type getAnimation<R extends Shape> = R['animation']
  export type getNameType<R extends Shape> = R['nameType']
  export type getCompTheme<R extends Shape = Shape> = R['compTheme']
  export type getMediaQ<R extends Shape = Shape> = R['mediaq']

  //******************** Ruleset Merge
  export type MergeRulesetWithOverrides = (...rulesets: TAddInConfig.RulesetWithAddIn[]) => TBasic.Ruleset
  export type MergeRulesetWithOverridesNative = (...rulesets: (TAddInConfig.RulesetWithAddInNative | ReactN.TextStyle)[]) => TBasic.RulesetNative
  export type MergeRulesetWithOverridesWeb = (...rulesets: TAddInConfig.RulesetWithAddInWeb[]) => TBasic.RulesetWeb


  /******************************************
    ALL SHEETS
  *******************************************/
  //export type SheetsWeb = { [P in keyof Shapes]?: TBasic.SheetWeb<Shapes[P]> }
  //export type SheetsNative = { [P in keyof Shapes]?: TBasic.SheetNative<Shapes[P]> }
  //export type Sheets = { [P in keyof Shapes]?: TBasic.Sheet<Shapes[P]> }

  //******************** $props in rulesets
  export type PropsInRulesetX<R extends Shape = Shape> = Partial<Overwrite<TBasic.getProps<R>, {
    $web?: Partial<TBasic.getPropsWeb<R>> //web specific style
    $native?: Partial<TBasic.getPropsNative<R>> //native specific style
    style?: never
    classes?: never
    childClasses?: never
    className?: never
  }>>

  export type PropsInRulesetWeb<R extends Shape = Shape> = TBasic.getProps<R> & TBasic.getPropsWeb<R>
  export type PropsInRulesetNative<R extends Shape = Shape> = TBasic.getProps<R> & TBasic.getPropsNative<R>
  export type PropsInRuleset<R extends Shape = Shape> = TBasic.getProps<R> & (TBasic.getPropsNative<R> | TBasic.getPropsWeb<R>)

}
