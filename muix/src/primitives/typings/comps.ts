import ReactN from 'react-native'

import { Types, TCommonStyles, TCommon } from 'reactxx-basic'

export const enum CompNames {
  Text = 'ReactXX$Text',
  View = 'ReactXX$View',
  Icon = 'ReactXX$Icon',
  ScrollView = 'ReactXX$ScrollView',
  AnimatedView = 'ReactXX$AnimatedView',
  AnimatedIcon = 'ReactXX$AnimatedIcon',
  AnimatedText = 'ReactXX$AnimatedText',
  AnimatedScrollView = 'ReactXX$AnimatedScrollView',
}

export namespace TComps {

  export const enum Consts {
    textClassName = 'reactxx-text'
  }

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

 export interface ViewShape extends Types.ShapeDefault<'pressable', TCommon.TEventsAll> {
  common: TCommon.ShapeViews<'root'>
  native: null
  style: 'View'
  propsWeb: React.HTMLAttributes<HTMLDivElement>
  propsNative: ReactN.ViewProperties
}

export interface TextShape extends Types.ShapeDefault<'pressable', TCommon.TEventsX> {
    common: TCommon.ShapeTexts<'root' | 'singleLineStyle'>
    native: null
    style: 'Text'
    props: { numberOfLines?: number; url?: string }
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }

  export interface IconShape extends Types.ShapeDefault<'pressable', TCommon.TEventsX> {
    common: TCommon.ShapeTexts<'root'>
    native: null
    style: 'Text'
    props: { data: string; url?: string }
    propsWeb: React.SVGAttributes<SVGElement>
    propsNative: ReactN.TextProperties
  }

  export interface ScrollViewShape extends Types.ShapeDefault<'rootHorizontal' | 'containerHorizontal'> {
    common: TCommon.ShapeViews<'root'> & TCommon.ShapeViews<'container'>
    native: null
    style: 'View'
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
