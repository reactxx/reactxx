import ReactN from 'react-native'
import { Muix } from 'reactxx-mui/typings/muix'

import { TCommonStyles } from 'reactxx-basic'
import { TComps } from 'reactxx-primitives'
import { Types, TTheme } from 'reactxx'

import { ButtonProps } from './mui'

export namespace MuiButtonT {

  export const enum CompNames {
    Button = 'MuiButton',
    ButtonIconLeft = 'MuixButtonIconLeft',
    ButtonIconRight = 'MuixButtonIconRight',
  }

  export type Shape = Types.OverwriteShape<{
    common: Types.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'> & Types.ShapeTexts<'label'>
    native: Types.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & Types.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    props: ButtonProps & TCommonStyles.OnPressAllX
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.Button | CompNames.ButtonIconLeft | CompNames.ButtonIconRight
    variant: string
    theme: TTheme.ThemeBase & Muix.Theme
  }>

}

//declare namespace ReactXX {
//  interface Shapes {
//    [MuiButton.CompNames.Button]?: MuiButtonT.Shape
//    [MuiButton.CompNames.ButtonIconLeft]?: MuiButtonT.Shape
//    [MuiButton.CompNames.ButtonIconRight]?: MuiButtonT.Shape
//  }
//}

