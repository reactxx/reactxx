import { ButtonProps } from './mui'
import ReactN from 'react-native'

import { TSheets } from 'reactxx-typings'
import { TComps, TBasic } from 'reactxx-basic/typings'

export namespace MuiButtonT {

  export const enum CompNames {
    Button = 'MuiButton',
    ButtonIconLeft = 'MuixButtonIconLeft',
    ButtonIconRight = 'MuixButtonIconRight',
  }

  export type Shape = TSheets.OverwriteShape<{
    common: TComps.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini'> & TComps.ShapeTexts<'label'>
    native: TComps.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & TComps.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    props: ButtonProps & TBasic.OnPressAllX
    propsNative: ReactN.TouchableOpacityProperties
    nameType: CompNames.Button | CompNames.ButtonIconLeft | CompNames.ButtonIconRight
  }>

}

//declare namespace ReactXX {
//  interface Shapes {
//    [MuiButton.CompNames.Button]?: MuiButtonT.Shape
//    [MuiButton.CompNames.ButtonIconLeft]?: MuiButtonT.Shape
//    [MuiButton.CompNames.ButtonIconRight]?: MuiButtonT.Shape
//  }
//}

