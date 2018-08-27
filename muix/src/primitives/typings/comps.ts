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

  export type TextShape = Types.OverwriteShape<{
    common: TCommon.ShapeTexts<'root' | 'singleLineStyle'>
    web: 'pressable'
    native: null
    style: 'Text'
    events: TCommon.TEventsX
    props: { numberOfLines?: number; url?: string }
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
    //nameType: CompNames.Text | CompNames.AnimatedText | string
  }>

  export type ViewShape = Types.OverwriteShape<{
    common: TCommon.ShapeViews<'root'>
    web: 'pressable'
    native: null
    style: 'View'
    events: TCommon.TEventsAll
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
    //nameType: CompNames.View | CompNames.AnimatedView | string
  }>

  export type IconShape = Types.OverwriteShape<{
    common: TCommon.ShapeTexts<'root'>
    web: 'pressable'
    native: null
    style: 'Text'
    events: TCommon.TEventsX
    props: { data: string; url?: string }
    propsWeb: React.SVGAttributes<SVGElement>
    propsNative: ReactN.TextProperties
    //nameType: CompNames.Icon | CompNames.AnimatedIcon | string
  }>

  export interface ScrollViewShape extends Types.ShapeDefault {
    common: TCommon.ShapeScrollViews<'root'> & TCommon.ShapeViews<'container'>
    web: 'rootHorizontal' | 'containerHorizontal'
    native: null
    style: 'View'
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
    //nameType: CompNames.ScrollView | CompNames.AnimatedScrollView | string
  }
}
