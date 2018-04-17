import ReactN from 'react-native'

import { Types } from 'reactxx-basic2'

export const fake = 0
export namespace TMediaQ {

  //******************** Platform specific
  export type RulesetWithAddIn<T extends Types.RulesetNativeIds = 'Text'> = Types.Ruleset & { $mediaq?: Sheet }

  export const enum Consts {
    maxBreakpoint = 10000000
  }

  export type Shape = string

  export type NotifySheetX<TState extends string> = { [P in TState]: [number | null, number | null] }

  export interface ComponentsMediaQ<TState extends string> {
    state: { [P in TState]?: boolean }
  }

  export interface Sheet {
    [query: string]: Types.Ruleset
  }

}
