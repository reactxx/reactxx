import ReactN from 'react-native'

import { TWebNative } from './web-native'
import { TBasic } from './basic'

export namespace TComps {

  /******************************************
    PRIMITIVE'S SHAPES
  *******************************************/

  export type ShapeTexts<P extends string> = { [p in P]: 'Text' }
  export type ShapeViews<P extends string> = { [p in P]: 'View' }
  export type ShapeScrollViews<P extends string> = { [p in P]: 'ScrollView' }
  export type ShapeImages<P extends string> = { [p in P]: 'Image' }


  export interface TextShape {
    common: ShapeTexts<'root' | 'singleLineStyle'>
    web: 'pressable'
    native: null
    style: 'Text'
    props: { numberOfLines?: number; url?: string } & TBasic.OnPressX
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }

  export interface ViewShape {
    common: ShapeViews<'root'>
    web: null
    native: null
    style: 'View'
    props: TBasic.OnPressAllX
    propsWeb: React.HTMLAttributes<HTMLDivElement>
    propsNative: ReactN.ViewProperties
  }

  export interface IconShape {
    common: ShapeViews<'root'>
    web: 'pressable'
    native: null
    style: 'Text'
    props: { data: string } & TBasic.OnPressX
    propsWeb: React.SVGAttributes<SVGElement> & { url?: string }
    propsNative: {
      size?: number
      color?: string
    }
  }

  export interface ScrollViewShape {
    common: ShapeScrollViews<'root'> & ShapeViews<'container'>
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
