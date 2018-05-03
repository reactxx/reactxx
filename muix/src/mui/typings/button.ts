import { ButtonProps } from './mui'
import ReactN from 'react-native'
import { Muix } from 'reactxx-mui/typings/muix'

import { TComps, TBasic, TTheme } from 'reactxx'
import { Types } from 'reactxx-basic'

export namespace MuiButtonT {

  export const enum CompNames {
    Button = 'MuiButton',
    ButtonIconLeft = 'MuixButtonIconLeft',
    ButtonIconRight = 'MuixButtonIconRight',
  }

  export type Shape = TBasic.OverwriteShape<{
    common: Types.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'> & Types.ShapeTexts<'label'>
    native: Types.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & Types.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    props: ButtonProps & Types.OnPressAllX
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

