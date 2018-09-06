import { TSheeter, TCompiler, TCommonStyles } from './index'

export namespace TExtends {

  /* cross platform common styling attributes 
   the same props has: 
   - react web HTML elements (e.g. <div classNameX={....}), 
   - react native build in components (e.g. <Text styleX={})
   - custom components 
   */
  export interface CommonProperties {
    classNameX?: ClassName
    styleX?: TSheeter.Style
    className?: string
  }

  export type StyleProc = (...styles: TSheeter.Style[]) => TCommonStyles.Ruleset
  // export type Style = StyleItem | StyleItem[]
  // export type StyleItem = TSheeter.Style | TCompiler.ValueNatives
  // export type StyleProc = (...styles: StyleItem[]) => TCommonStyles.Ruleset

  export type ClassNameItem = TSheeter.Ruleset | TCompiler.Ruleset | TCompiler.Values
  export type ClassName = ClassNameItem | ClassNameItem[]

  export type ClassNamesProc = (...rulesets: ClassNameItem[]) => TCompiler.Values
  export type ClassNamesWithQueryProc = (query: Query, ...rulesets: ClassNameItem[]) => TCompiler.Values

  export type RulesetCompiler = (ruleset: TSheeter.RulesetInner) => TCompiler.Values
  export type NormalizeClassNames = (value: TCompiler.Values) => TCompiler.PlatformValues

  export interface Query { // 
    whenUsed?: WhenUsedQuery // map of used ruleset names
    mediaq?: MediaQQuery // actual width
    animation?: AnimationQuery // animation state: opened x closed
  }

  export type WhenUsedQuery = Record<string, boolean>

  export type MediaQQuery = number

  export type AnimationQuery = 'opened' | 'closed'



}