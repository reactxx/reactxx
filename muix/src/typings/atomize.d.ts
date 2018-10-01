import { TNativeRuleValue, TSheeter, TVariants } from './index'
import { TComponents } from './components';
import { TWithStyles } from './with-styles';

declare namespace TAtomize {

  export type ToPlatformAtomizeRuleset = (ruleset: {}, tracePath?: string) => AtomicArray
  export type GetPlatformTracePath = (value: Atomic) => string
  export type ToPlatformClassName = (array: AtomicArray) => string | NativeStyle

  //export const TypedInterfaceProp = '``'

  export const enum TypedInterfaceTypes {
    prop = '``',
    atomizedRuleset = 'c'/*compiled ruleset*/,
    atomicArray = 'v' /*value array*/,
    reactxxComponent = 'x',
    atomizedStyleWeb = 'w',
  }

  export interface TypedInterface {
    [TypedInterfaceTypes.prop]: TypedInterfaceTypes
  }

  export type Sheet<R extends TSheeter.Shape = TSheeter.Shape> = { [P in TSheeter.RulesetNamesAll<R>]: AtomizedRuleset }

  export interface AtomizedRuleset extends TypedInterface {
    [TypedInterfaceTypes.prop]: TypedInterfaceTypes.atomizedRuleset
    name: string
    list: Variants
  }
  export type Variants = Variant[]
  export interface Variant {
    atomicArray: AtomicArray // class names for web, propId-propValue for native
    deffered?: boolean // using of variant is deffered till 'toAtomicArray' phase
    conditions?: TVariants.Conditions // conditions (when is ruleset used)
  }

  export type AtomicArray = {
    [TypedInterfaceTypes.prop]: TypedInterfaceTypes.atomicArray
    state?: TWithStyles.InstanceState
  } &
    Atomic[] // last value in array (with the same propId) wins!

  export type NativeStyle = Record<string, TNativeRuleValue>

  export type Atomic = AtomicNative | AtomicWeb
  export type AtomicWeb = string | TVariants.Deffered // fela class name. propId's are cached (propId = fela.renderer.propIdCache[valueWeb])
  export interface AtomicNative extends TVariants.Deffered { 
    propId: string // property name
    value: TNativeRuleValue // propert value
    tracePath?: string // for Dev: path to class source
  }
  export type AtomicNatives = AtomicNative[]


  export type Ruleset = TAtomize.AtomizedRuleset | TAtomize.AtomicArray

}
