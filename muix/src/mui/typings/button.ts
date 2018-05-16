import ReactN from 'react-native'
import { Muix } from 'reactxx-mui/typings/muix'

import { TCommonStyles, TCommon } from 'reactxx-basic'
import { TComps } from 'reactxx-primitives'
import { Types } from 'reactxx'

import { ButtonProps } from './mui'

export namespace MuiButtonT {

  export const enum CompNames {
    Button = 'MuiButton',
    ButtonIconLeft = 'MuixButtonIconLeft',
    ButtonIconRight = 'MuixButtonIconRight',
  }

  export type Shape = Types.OverwriteShape<{
    common: TCommon.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'> & TCommon.ShapeTexts<'label'>
    native: TCommon.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & TCommon.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    events: TCommon.TEvents,
    props: ButtonProps
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.Button | CompNames.ButtonIconLeft | CompNames.ButtonIconRight
    variant: string
    theme: TCommon.ThemeBase & Muix.Theme
  }>

}

//declare namespace ReactXX {
//  interface Shapes {
//    [MuiButton.CompNames.Button]?: MuiButtonT.Shape
//    [MuiButton.CompNames.ButtonIconLeft]?: MuiButtonT.Shape
//    [MuiButton.CompNames.ButtonIconRight]?: MuiButtonT.Shape
//  }
//}

