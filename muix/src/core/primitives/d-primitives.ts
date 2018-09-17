import ReactN from 'react-native'

import { TSheeter, TComponents } from '../d-index'

// export const enum CompNames {
//   Text = 'ReactXX$Text',
//   View = 'ReactXX$View',
//   Icon = 'ReactXX$Icon',
//   ScrollView = 'ReactXX$ScrollView',
//   AnimatedView = 'ReactXX$AnimatedView',
//   AnimatedIcon = 'ReactXX$AnimatedIcon',
//   AnimatedText = 'ReactXX$AnimatedText',
//   AnimatedScrollView = 'ReactXX$AnimatedScrollView',
// }

export namespace TPrimitives {

 
  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

 export interface ViewShape extends TSheeter.ShapeAncestor {
  common: TSheeter.ShapeViews<'root'>
  web: TSheeter.ShapeWeb<'pressable'>
  style: 'View'
  propsWeb: React.HTMLAttributes<HTMLDivElement>
  propsNative: ReactN.ViewProperties
  events: TSheeter.ShapeWeb<TComponents.TEventsAll>
}

export interface TextShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    //web: TSheeter.ShapeWeb<'pressable'>
    sheetFlags: TSheeter.ShapeFlags<'pressable' | 'singleLine'>
    style: 'Text'
    props: { numberOfLines?: number; url?: string }
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
    events: TSheeter.ShapeWeb<TComponents.TEventsXNames>
  }

  export interface IconShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    web: TSheeter.ShapeWeb<'pressable'>
    style: 'Text'
    props: { data: string; url?: string }
    propsWeb: React.SVGAttributes<SVGElement>
    propsNative: ReactN.TextProperties
    events: TSheeter.ShapeWeb<TComponents.TEventsXNames>
  }

  export interface ScrollViewShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'container'>
    web: TSheeter.ShapeWeb<'rootHorizontal' | 'containerHorizontal'>
    style: 'View'
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
