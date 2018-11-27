import ReactN from 'react-native'

import { TComponents } from 'reactxx-typings'

export const enum CompNames {
  Text = 'ReactXXText',
  View = 'ReactXXView',
  Icon = 'ReactXXIcon',
  ScrollView = 'ReactXXScrollView',

  AnimatedView = 'ReactXXAnimatedView',
  AnimatedIcon = 'ReactXXAnimatedIcon',
  AnimatedText = 'ReactXXAnimatedText',
  AnimatedScrollView = 'ReactXXAnimatedScrollView',
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
    cases: TSheeter.ShapeMarks<'pressable'>
    style: 'View'
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
    events: TSheeter.ShapeMarks<TComponents.TEventsAll>
  }

  export interface TextShape extends TSheeter.ShapeAncestor {
    rulesets: {
      root: 'Text',
    },


    common: TSheeter.ShapeTexts<'root'>
    cases: TSheeter.ShapeMarks<'pressable' | 'singleLine'>
    style: 'Text'
    props: { singleLine?: boolean; url?: string }
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
    events: TSheeter.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface IconShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    cases: TSheeter.ShapeMarks<'pressable'>
    style: 'Text'
    props: { data: string; url?: string }
    propsWeb: React.SVGAttributes<SVGElement>
    propsNative: ReactN.TextProperties
    events: TSheeter.ShapeMarks<TComponents.TEventsXNames>
  }

  export interface ScrollViewShape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'container'>
    cases: TSheeter.ShapeMarks<'horizontal'>
    style: 'View'
    props: { horizontal?: boolean }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
