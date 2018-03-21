import { TBasic } from './basic'

export namespace TTypescriptConfig {
  //******************** Cross platform 
  export interface RulesetAddInX<T extends TBasic.RulesetNativeIds, R extends TBasic.Shape> { }
  export interface SheetXAddIn<R extends TBasic.Shape = TBasic.Shape> { }

  //******************** Platform specific
  export type RulesetWithAddIn<R extends TBasic.Shape = TBasic.Shape> = TBasic.Ruleset
  export interface RulesetWithAddInWeb<R extends TBasic.Shape = TBasic.Shape> extends TBasic.RulesetWeb { }
  export type RulesetWithAddInNative<T extends TBasic.RulesetNativeIds, R extends TBasic.Shape = TBasic.Shape> = TBasic.NativeRules<T>

  export interface SheetAddInWeb<R extends TBasic.Shape = TBasic.Shape> { }
  export interface SheetAddInNative<R extends TBasic.Shape = TBasic.Shape> { }
}