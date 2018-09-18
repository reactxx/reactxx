import { TValue, TSheeter, TVariants } from '../d-index'

export namespace TCompiler {

  export type ToAtomicClassesProc = (ruleset: TSheeter.Ruleset) => AtomicClasses

  export const TypedInterfaceProp = '``'

  export enum TypedInterfaceTypes {
    compiled = 'c'/*compiled ruleset*/,
    nativeValue = 'n' /*Native value*/
  }

  export interface TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes
  }

  export type Sheet<R extends TSheeter.Shape = TSheeter.Shape> = { [P in TSheeter.RulesetNamesAll<R>]: LinearAndAtomized }

  export interface LinearAndAtomized extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.compiled
    name: string
    list: Variants
  }
  export type Variants = Variant[]
  export interface Variant {
    atomicClasses: AtomicClasses // class names for web, propId-propValue for native
    trace?: {} // for DEV_MODE: ruleset source
    path?: string // for DEV_MODE: ruleset origin path
    conditions?: TVariants.Conditions // conditions (when is ruleset used)
  }

  export type AtomicClasses = AtomicClass[] // last value in array (with the same propId) wins!

  export type AtomicClass = AtomicNative | AtomicWeb
  export type AtomicWeb = string // fela class name. propId's are cached (propId = fela.renderer.propIdCache[valueWeb])
  export interface AtomicNative extends TypedInterface {
    [TypedInterfaceProp]: TypedInterfaceTypes.nativeValue
    propId: string // property name
    value: TValue // propert value
  }
  export type AtomicNatives = AtomicNative[]

  // export type PlatformValues = PlatformValuesWeb | PlatformValuesNative
  // export type PlatformValuesWeb = string
  // export type PlatformValuesNative = Record<string, string | number>
}
