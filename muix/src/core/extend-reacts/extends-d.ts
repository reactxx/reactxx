import { TSheeter, TCompiler, TCommonStyles } from '../typings'

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

  // export interface Query { // 
  //   whenUsed?: WhenUsedQuery // map of used ruleset names
  //   mediaq?: MediaQQuery // actual width
  //   animation?: AnimationQuery // animation state: opened x closed
  //   conditionalQuery?: ConditionalQuery
  // }

  // export type WhenUsedQuery = Record<string, boolean>

  // export type MediaQQuery = number

  // export type AnimationQuery = 'opened' | 'closed'

  // export type ConditionalQuery = {

  // }

}