import ReactN from 'react-native'

import { TSheeter, TComponents } from 'reactxx-typings'

export const enum CompNames {
  Text = 'reactxx_Text',
  View = 'reactxx_View',
  Icon = 'reactxx_Icon',
  ScrollView = 'reactxx_ScrollView',
  AnimatedView = 'reactxx_AnimatedView',
  AnimatedIcon = 'reactxx_AnimatedIcon',
  AnimatedText = 'reactxx_AnimatedText',
  AnimatedScrollView = 'reactxx_AnimatedScrollView',
}

export namespace TPrimitives {

 
  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

 export interface ViewShape extends TSheeter.ShapeAncestor {
  common: TSheeter.ShapeViews<'root'>
  flags: TSheeter.ShapeMarks<'pressable'>
  //web: TSheeter.ShapeWeb<'pressable'>
  style: 'View'
  propsWeb: React.HTMLAttributes<HTMLDivElement>
  propsNative: ReactN.ViewProperties
  events: TSheeter.ShapeMarks<TComponents.TEventsAll>
}

export interface TextShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    flags: TSheeter.ShapeMarks<'pressable' | 'singleLine'>
    style: 'Text'
    props: { singleLine?: boolean; url?: string }
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
    events: TSheeter.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface IconShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    flags: TSheeter.ShapeMarks<'pressable'>
    //web: TSheeter.ShapeWeb<'pressable'>
    style: 'Text'
    props: { data: string; url?: string }
    propsWeb: React.SVGAttributes<SVGElement>
    propsNative: ReactN.TextProperties
    events: TSheeter.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface ScrollViewShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'container'>
    flags: TSheeter.ShapeMarks<'horizontal'>
    //web: TSheeter.ShapeWeb<'rootHorizontal' | 'containerHorizontal'>
    style: 'View'
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
