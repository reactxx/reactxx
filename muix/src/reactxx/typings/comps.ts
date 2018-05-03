import ReactN from 'react-native'

import { Types } from 'reactxx-basic'

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
    common: Types.ShapeTexts<'root' | 'singleLineStyle'>
    web: 'pressable'
    native: null
    style: 'Text'
    props: { numberOfLines?: number; url?: string } & Types.OnPressX
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }

  export interface ViewShape {
    common: Types.ShapeViews<'root'>
    web: null
    native: null
    style: 'View'
    props: Types.OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }

  export interface IconShape {
    common: Types.ShapeViews<'root'>
    web: 'pressable'
    native: null
    style: 'Text'
    props: { data: string } & Types.OnPressX
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    propsNative: {
      size?: number
      color?: string
    }
  }

  export interface ScrollViewShape {
    common: Types.ShapeScrollViews<'root'> & Types.ShapeViews<'container'>
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
