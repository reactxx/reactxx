import ReactN from 'react-native'

import { TTyped, $W, $T, $V, $I, V, T, I, O } from 'reactxx-typings'
import { TAsTypedClassName } from 'reactxx-use-sheeter';

export interface TextShape extends TTyped.ShapeAncestor {
    root: {
      web: React.HTMLAttributes<HTMLSpanElement>
      native: ReactN.TextProperties
      style: T
    }
    //className: T
    //sheet: { root: T },
    sheetQuery: { pressable: boolean }
    props: { singleLine?: boolean; url?: string }
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  type TT = TTyped.Sheet<TextShape>

  type TTT = keyof TTyped.getSheet<TextShape>
  type TTTT= keyof TextShape['sheet'] //extends TTyped.RulesetIds ? never : TextShape['sheet']
  type TTTTT= keyof TextShape['sheet'] extends TTyped.RulesetIds ? TextShape['sheet'] : never //TextShape['sheet']
  type TTTTTT = string extends TTyped.RulesetIds ? 'A' : 'B'

