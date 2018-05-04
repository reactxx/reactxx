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

  export interface TextShape {
    common: TCommon.ShapeTexts<'root' | 'singleLineStyle'>
    web: 'pressable'
    native: null
    style: 'Text'
    props: { numberOfLines?: number; url?: string } & TCommonStyles.OnPressX
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }

  export interface ViewShape {
    common: TCommon.ShapeViews<'root'>
    web: null
    native: null
    style: 'View'
    props: TCommonStyles.OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }

  export interface IconShape {
    common: TCommon.ShapeViews<'root'>
    web: 'pressable'
    native: null
    style: 'Text'
    props: { data: string } & TCommonStyles.OnPressX
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    propsNative: {
      size?: number
      color?: string
    }
  }

  export interface ScrollViewShape {
    common: TCommon.ShapeScrollViews<'root'> & TCommon.ShapeViews<'container'>
    web: 'rootHorizontal' | 'containerHorizontal'
    native: null
    style: 'ScrollView'
    props: {
      horizontal?: boolean
    }
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ScrollViewProperties
  }
}
