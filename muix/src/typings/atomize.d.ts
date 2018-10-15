import { TNativeRuleValue, TSheeter, TVariants } from './index'
import { TComponents } from './components';
import { TWithStyles } from './with-styles';

declare namespace TAtomize {

  export type ToPlatformAtomizeRulesetProc = (ruleset: {}, tracePath?: string) => AtomicArray
  export interface Platform {
    toPlatformAtomizeRuleset: ToPlatformAtomizeRulesetProc
    dumpAtomized: (classNames: AtomicArrayLow) => any,
    applyLastwinsStrategy: (values: AtomicArrayLow) => AtomicArrayLow
    finalClassNameStep: (values: AtomicArrayLow) => string | Record<string, any>
  }
  export type GetPlatformTracePath = (value: Atomic) => string
  //export type ToPlatformClassName = (array: AtomicArray, propsPlatform: {style, className}) => void

  export const enum TypedInterfaceTypes {
    prop = '~',
    atomizedRuleset = 'c'/*compiled ruleset*/,
    atomicArray = 'v' /*value array*/,
    reactxxComponent = 'x',
    //atomizedStyleWeb = 'w',
  }

  export interface TypedInterface {
    [TypedInterfaceTypes.prop]: string
  }

  export type Sheet<R extends TSheeter.Shape = TSheeter.Shape> = { [P in TSheeter.RulesetNamesAll<R>]: AtomizedRuleset }

  export interface AtomizedRuleset extends TypedInterface {
    [TypedInterfaceTypes.prop]: TypedInterfaceTypes.atomizedRuleset
    name: string
    list: Variants
  }
  export type Variants = Variant[]
  export interface Variant {
    atomicArray?: AtomicArray // class names for web, propId-propValue for native
    deffered?: boolean // using of variant is deffered till 'toAtomicArray' phase
    conditions?: TVariants.Conditions // conditions (when is ruleset used)
  }
  export interface Deffered extends Variant, TypedInterface {

  }

  export interface AtomicArrayExtension {
    [TypedInterfaceTypes.prop]: TypedInterfaceTypes.atomicArray
    state?: TWithStyles.PipelineState
  }

  export type AtomicArray =
    AtomicArrayExtension &
    Atomic[] // last value in array (with the same propId) wins!

  export type AtomicArrayLow = AtomicWebsLow | AtomicNativeLow

  export type NativeStyle = Record<string, TNativeRuleValue>

  export type Atomic = AtomicNative | AtomicWeb
  export interface __dev_AtomicWeb { 
    tracePath?: string
    cache?: __dev_WebCache
  }// { tracePath?: __dev_WebCache, value: string }
  export interface __dev_WebCache {
    type: string
    className: string
    selector: string
    declaration: string
    pseudo: string
    media: string
    support: string
    //path?: string
  }
  export type AtomicWeb =
    string |
    __dev_AtomicWeb |
    Deffered // fela class name. propId's are cached (propId = fela.renderer.propIdCache[valueWeb])
  export interface AtomicNative extends Deffered {
    propId: string // property name
    value: TNativeRuleValue // propert value
    //tracePath?: string // for Dev: path to class source
  }
  export type TNativeRuleValue = string | number | __dev_AtomicNative
  export interface __dev_AtomicNative {
    value: string | number
    tracePath: string
  }

  export type AtomicNatives = AtomicNative[] & AtomicArrayExtension
  export type AtomicWebs = AtomicWeb[] & AtomicArrayExtension
  export type AtomicWebsLow = AtomicWeb[]
  export type AtomicNativeLow = Record<string, TNativeRuleValue>


  export type Ruleset = AtomizedRuleset | AtomicArray

}
