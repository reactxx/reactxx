import { TValue,TSheeter, TRulesetConditions } from '../index-d'

export namespace TCompiler {

  export type RulesetCompiler = (ruleset: TSheeter.Ruleset) => Values

  export const TypedInterfaceProp = '``'

  export enum TypedInterfaceTypes {
    compiled = 'c'/*compiled*/,
    nativeValue = 'n' /*Native value*/
  }

  export interface TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes
  }

  export type Sheet<R extends TSheeter.Shape = TSheeter.Shape> = { [P in TSheeter.RulesetNamesAll<R>]: Ruleset }

  export interface Ruleset extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.compiled
    name: string
    list: RulesetList
  }
  export type RulesetList = RulesetListItem[]
  export interface RulesetListItem {
    rules: Values // class names for web, propId-propValue for native
    rulesTrace?: {} // for DEV_MODE: ruleset source
    path?: string // for DEV_MODE: ruleset origin path
    conditions?: TRulesetConditions.Conditions // conditions (when is ruleset used)
  }

  export type Values = Value[] // last value in array (with the same propId) wins!

  export type Value = ValueNative | ValueWeb
  export type ValueWeb = string // fela class name. propId's are cached (propId = fela.renderer.propIdCache[valueWeb])
  export interface ValueNative extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.nativeValue
    propId: string // property name
    value: TValue // propert value
  }
  export type ValueNatives = ValueNative[]

  export type PlatformValues = PlatformValuesWeb | PlatformValuesNative
  export type PlatformValuesWeb = string
  export type PlatformValuesNative = Record<string, string | number>
}
