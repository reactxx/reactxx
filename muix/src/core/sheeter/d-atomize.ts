import { TValue, TSheeter, TVariants } from 'reactxx-core/d-index'

export namespace TAtomize {

  export type ToAtomicClassesProc = (ruleset: TSheeter.Ruleset, tracePath?: string) => AtomicArray
  export type TraceAtomicClassProc = (value: Atomic) => string

  export const TypedInterfaceProp = '``'

  export enum TypedInterfaceTypes {
    atomizedRuleset = 'c'/*compiled ruleset*/,
    //nativeValue = 'n' /*Native value*/,
    atomicArray = 'v' /*value array*/,
  }

  export interface TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes
  }

  export type Sheet<R extends TSheeter.Shape = TSheeter.Shape> = { [P in TSheeter.RulesetNamesAll<R>]: AtomizedRuleset }

  export interface AtomizedRuleset extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.atomizedRuleset
    name: string
    list: Variants
  }
  export type Variants = Variant[]
  export interface Variant {
    atomicArray: AtomicArray // class names for web, propId-propValue for native
    //trace?: {} // for DEV_MODE: ruleset source
    //path?: string // for DEV_MODE: ruleset origin path
    conditions?: TVariants.Conditions // conditions (when is ruleset used)
  }

  //export type 

  export type AtomicArray = Atomic[] & {[TypedInterfaceProp]: TypedInterfaceTypes.atomicArray} // last value in array (with the same propId) wins!

  export type Atomic = AtomicNative | AtomicWeb
  export type AtomicWeb = string // fela class name. propId's are cached (propId = fela.renderer.propIdCache[valueWeb])
  export interface AtomicNative { //extends TypedInterface {
    //[TypedInterfaceProp]: TypedInterfaceTypes.nativeValue
    propId: string // property name
    value: TValue // propert value
    tracePath?: string // for Dev: path to class source
  }
  export type AtomicNatives = AtomicNative[]

  // export type PlatformValues = PlatformValuesWeb | PlatformValuesNative
  // export type PlatformValuesWeb = string
  // export type PlatformValuesNative = Record<string, string | number>
}
