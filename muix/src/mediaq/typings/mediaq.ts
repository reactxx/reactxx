import { TCommonStyles, Types } from 'reactxx-basic';
import { AddIns as SheeterAddIns, PropsPatchGetters as SheeterPropsPatchGetters, Ruleset as SheeterRuleset } from 'reactxx-sheeter';

export namespace TMediaQ {

  export interface MediaQFlags {
    addIns: SheeterAddIns // TMediaQ.NotifyIntervalX
    getPropsPatches: SheeterPropsPatchGetters
  }

  //export type MediaQFlags = TSheeter.PropsPatchGetters

  /************************
  * RULESET TYPINGS
  *************************/
  //*** Cross platform:

  // Ruleset
  export type RulesetWithAddInX<T extends TCommonStyles.RulesetNativeIds = 'Text'> = Types.RulesetX & MediaQRulesetPartX<T>

  // $mediaq ruleset part. 'query' has '-640' or '640-1024' or '1024-' format
  export interface MediaQRulesetPartX<T extends TCommonStyles.RulesetNativeIds = 'Text'> {
    $mediaq?: { [query: string]: Types.RulesetX<T> }
  }

  //*** Platform dependent
  export type MediaQSheet = { [P in string]: RulesetWithAddIn }

  export type RulesetWithAddIn = TCommonStyles.Ruleset & MediaQRulesetPart

  export interface MediaQRulesetPart {
    $mediaq?: { [query: string]: SheeterRuleset } //TCommonStyles.Ruleset }
  }

  //*** decoded MediaQSheet
  //export interface MediaQRulesetDecoded {
  //  rulesetName: string // ruleset name in sheet
  //  items: RulesetDecoded[] // decoded MediaQRulesetPartX
  //}

  //export interface RulesetDecoded {
  //  from: Breakpoint
  //  to: Breakpoint
  //  ruleset: SheeterRuleset
  //}

  /************************
  * NOTIFY TYPINGS
  *************************/

  ////*** breakpoint
  //export const enum Consts {
  //  maxBreakpoint = 10000000
  //}

  export interface Breakpoint {
    id: number // 0..31, index to breakpoints array
    value: number // e.g. 640
    active?: boolean
  }

  //***  MediaQ Notify properties
  export type NotifyIntervalX<TState extends string = string> = { [P in TState]: [number | null, number | null] }

  export type NotifyIntervalDecoded<TState extends string = string> = { [P in TState]: [Breakpoint, Breakpoint] }

  export interface CodeProps<TState extends string = string> { mediaqFlags?: MediaFlags<TState> }
  export type MediaFlags<TState extends string = string> = { [P in TState]: boolean }

}
