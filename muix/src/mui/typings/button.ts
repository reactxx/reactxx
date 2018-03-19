import { ButtonProps } from './mui'
import ReactN from 'react-native'

import { SheetsT } from 'reactxx-typings'

export namespace MuiButtonT {

  export const enum CompNames {
    Button = 'MuiButton',
    ButtonIconLeft = 'MuixButtonIconLeft',
    ButtonIconRight = 'MuixButtonIconRight',
  }

  export type Shape = SheetsT.OverwriteShape<{
    common: SheetsT.ShapeViews<'root' | 'disabled' | 'flatPrimary' | 'flatSecondary' | 'raised' | 'raisedPrimary' | 'raisedSecondary' | 'fab' | 'mini' > & SheetsT.ShapeTexts<'label'>
    native: SheetsT.ShapeViews<'raisedDisable' | 'ripple' | 'flat' | 'active'> & SheetsT.ShapeTexts<'labelIcon'>
    web: 'colorInherit' | 'keyboardFocused'
    props: ButtonProps & SheetsT.OnPressAllX
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

