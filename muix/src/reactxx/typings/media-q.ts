import ReactN from 'react-native'

import { Types } from 'reactxx-basic'

import { TBasic, TAddInConfig } from './basic'

export namespace TMediaQ {

  export interface SheetX<T extends Types.RulesetNativeIds = 'Text', R extends TBasic.Shape = TBasic.Shape> {
    [query: string]: TBasic.RulesetX<T, R>
  }

  export interface Patch { start: number; end: number; ruleset: TAddInConfig.RulesetWithAddIn }

}
