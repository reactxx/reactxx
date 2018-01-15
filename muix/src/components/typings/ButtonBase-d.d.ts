//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
declare namespace MuixButtonBase {

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<'root'>
    native: Muix.ShapeViews<'style' | 'ripple'>
    props: Muix.ButtonBaseProps & Muix.TOnClickWeb
    propsNative: ReactN.TouchableOpacityProperties
    web: string
  }>
}

declare namespace Muix {
  interface SheetsX {
    MuiButtonBase?: Muix.PartialSheetX<Shape>
  }
}

