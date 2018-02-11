//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
declare namespace MuixButtonBase {

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<'root'>
    native: Prim5s.ShapeViews<'ripple'>
    props: Muix.ButtonBaseProps & Prim5s.OnClick
    propsNative: ReactN.TouchableOpacityProperties
    web: string
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    MuiButtonBase?: Prim5s.PartialSheetX<Shape>
  }
}

