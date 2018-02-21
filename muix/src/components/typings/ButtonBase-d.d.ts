//import ReactN from 'react-native'
//import { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'
declare namespace MuixButtonBase {

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<'root'>
    native: ReactXX.ShapeViews<'ripple'>
    props: Muix.ButtonBaseProps & ReactXX.OnPressAllWeb
    propsNative: ReactN.TouchableOpacityProperties
    web: string
  }>
}

declare namespace ReactXX {
  interface SheetsX {
    MuiButtonBase?: ReactXX.PartialSheetX<Shape>
  }
}

