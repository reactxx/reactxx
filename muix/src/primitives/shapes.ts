import ReactN from 'react-native'

import { TTyped, $W, $T, $V, $I, V, T, I } from 'reactxx-typings'


export namespace TPrimitives {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

  export interface ViewShape extends TTyped.ShapeAncestor {
    root: {
      web: React.HTMLAttributes<HTMLDivElement>
      native: ReactN.ViewProperties
    }
    sheet: { root: V }
    //className: V
    sheetQuery: { pressable: boolean }
    //propsWeb: React.HTMLAttributes<HTMLDivElement>
    //propsNative: ReactN.ViewProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsAll>
  }

  export interface TextShape extends TTyped.ShapeAncestor {
    root: {
      web: React.HTMLAttributes<HTMLSpanElement>
      native: ReactN.TextProperties
    }
    sheet: { root: T },
    sheetQuery: { pressable: boolean }
    props: { singleLine?: boolean; url?: string }
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface IconShape extends TTyped.ShapeAncestor {
    root: {
      web: React.SVGAttributes<SVGElement>
      native: ReactN.TextProperties
    }
    sheet: { root: T },
    //className: T
    props: { data?: string; url?: string, children?: string }
    sheetQuery: { pressable: boolean }
    //propsWeb: React.SVGAttributes<SVGElement>
    //propsNative: ReactN.TextProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface ScrollViewShape extends TTyped.ShapeAncestor {
    root: {
      web: React.HTMLAttributes<HTMLDivElement>
      native: ReactN.ViewProperties
    }
    sheet: { root: V; container: V }
    //className: V
    props: { horizontal?: boolean }
    //propsWeb: React.HTMLAttributes<HTMLDivElement>
    //propsNative: ReactN.ScrollViewProperties
  }
}
