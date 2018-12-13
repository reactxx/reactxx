import ReactN from 'react-native'

import { TTyped, V, T } from 'reactxx-typings'

import { TEvents } from './events'

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
    props: { url?: string } & TEvents.Events<TEvents.TEventsAll>

    rootWebProps: React.HTMLAttributes<HTMLDivElement>
    rootNativeProps: ReactN.ViewProperties & TEvents.EventsNativeView
  }

  export interface TextShape extends TTyped.ShapeAncestor {
    sheet: {
      root: T
    }
    props: { singleLine?: boolean; url?: string } & TEvents.Events<TEvents.TEventsSimple>

    sheetQuery: {
      pressable: boolean
    }

    rootWebProps: React.HTMLAttributes<HTMLSpanElement>
    rootNativeProps: ReactN.TextProperties & TEvents.EventsNativeText
  }

  export interface IconShape extends TTyped.ShapeAncestor {
    sheet: {
      root: T
    }
    props: { data?: string; url?: string, children?: string } & TEvents.Events<TEvents.TEventsSimple>
    sheetQuery: { pressable: boolean }

    rootWebProps: React.SVGAttributes<SVGElement>
    rootNativeProps: ReactN.TextProperties & TEvents.EventsNativeText
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
