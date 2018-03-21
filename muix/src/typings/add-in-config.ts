import { TSheets } from './sheets'
import { TAnimation } from './animation'
import { TMediaQ } from './media-q'

export namespace TAddInConfig {
  //******************** Cross platform 
  export interface RulesetAddInX<T extends TSheets.RulesetNative, R extends TSheets.Shape> { $overrides?: TSheets.PartialSheetX<R>; $name?: string; $mediaq?: TMediaQ.SheetX<T, R>; $props?: TSheets.PropsInRulesetX<R> }
  export interface SheetXAddIn<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }

  //******************** Platform specific
  export type RulesetWithAddIn<R extends TSheets.Shape = TSheets.Shape> = TSheets.Ruleset & { $overrides?: TSheets.Sheet<R>; $name?: string; $props?: TSheets.PropsInRuleset<R>; $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }
  export interface RulesetWithAddInWeb<R extends TSheets.Shape = TSheets.Shape> extends TSheets.RulesetWeb { $overrides?: TSheets.SheetWeb<R>; $name?: string; $props?: TSheets.PropsInRulesetWeb<R> }
  export type RulesetWithAddInNative<T extends TSheets.RulesetNative = {}, R extends TSheets.Shape = TSheets.Shape> = T & { $overrides?: TSheets.SheetNative<R>; $name?: string; $props?: TSheets.PropsInRulesetNative<R> }

  export interface SheetAddInWeb<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }
  export interface SheetAddInNative<R extends TSheets.Shape = TSheets.Shape> { $animations?: TAnimation.SheetsX<TSheets.getAnimation<R>>, $mediaq?: TMediaQ.NotifySheetX<TSheets.getMediaQ<R>> }
}