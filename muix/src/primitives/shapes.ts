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
    sheet: {
      root: V
    }
    sheetQuery: { pressable: boolean }

    rootWebProps: React.HTMLAttributes<HTMLDivElement>
    rootNativeProps: ReactN.ViewProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsAll>
  }

  export interface TextShape extends TTyped.ShapeAncestor {
    sheet: {
      root: T
    }
    props: { singleLine?: boolean; url?: string }
    sheetQuery: { pressable: boolean }

    rootWebProps: React.HTMLAttributes<HTMLSpanElement>
    rootNativeProps: ReactN.TextProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface IconShape extends TTyped.ShapeAncestor {
    sheet: {
      root: T
    }
    props: { data?: string; url?: string, children?: string }
    sheetQuery: { pressable: boolean }

    rootWebProps: React.SVGAttributes<SVGElement>
    rootNativeProps: ReactN.TextProperties
    //events: TTyped.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface ScrollViewShape extends TTyped.ShapeAncestor {
    sheet: {
      root: V
      container: V
    }
    props: { horizontal?: boolean }

    rootWebProps: React.HTMLAttributes<HTMLDivElement>
    rootNativeProps: ReactN.ViewProperties
  }
}
