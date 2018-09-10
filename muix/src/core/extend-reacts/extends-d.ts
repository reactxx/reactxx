import { TSheeter, TCompiler, TCommonStyles } from '../index-d'

export namespace TExtends {

  /* cross platform styling attributes 
   the same props has: 
   - react web HTML elements (e.g. <div classNameX={....}), 
   - react native build in components (e.g. <Text styleX={...})
   - custom components (e.g. <IconButton classNameX={...})
   */
  export interface CommonProperties<R extends TSheeter.Shape = TSheeter.Shape> {
    classNameX?: ClassName
    styleX?: Style<R> | Style<R>[]
  }

  export type Style<R extends TSheeter.Shape = TSheeter.Shape> = TSheeter.Style<TSheeter.getStyle<R>>

  export type ClassNameItem = TSheeter.Ruleset | TCompiler.Ruleset | TCompiler.Values
  export type ClassName = ClassNameItem | ClassNameItem[]

  export type RulesetCompiler = (ruleset: TSheeter.RulesetInner) => TCompiler.Values

}