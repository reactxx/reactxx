//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
declare namespace MuixButtonBase {

  type Shape = Muix.OverwriteShape<{
    common: Muix2.ShapeViews<'root'>
    native: Muix2.ShapeViews<'ripple'>
    props: Muix.ButtonBaseProps & Muix2.TOnClickWeb
    propsNative: ReactN.TouchableOpacityProperties
    web: string
  }>
}

declare namespace Muix2 {
  interface SheetsX {
    MuiButtonBase?: Muix2.PartialSheetX<Shape>
  }
}

