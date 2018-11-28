import ReactN from 'react-native'

import { TTyped } from 'reactxx-typings'
import { $W, $T, $V, $I, V, T, I } from 'reactxx-typings'


export namespace TPrimitives {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

  export interface ViewShape extends TTyped.ShapeAncestor {
    sheet: { root: V }
    className: V
    sheetQuery: { pressable: boolean }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsAll>
  }

  export interface TextShape extends TTyped.ShapeAncestor {
    sheet: { root: T },
    className: T
    sheetQuery: { pressable: boolean }
    props: { singleLine?: boolean; url?: string }
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface IconShape extends TTyped.ShapeAncestor {
    sheet: { root: T },
    className: T
    sheetQuery: { pressable: boolean }
    props: { data: string; url?: string }
    propsWeb: React.SVGAttributes<SVGElement>
    propsNative: ReactN.TextProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface ScrollViewShape extends TTyped.ShapeAncestor {
    sheet: { root: V; container: V }
    className: V
    props: { horizontal?: boolean }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
