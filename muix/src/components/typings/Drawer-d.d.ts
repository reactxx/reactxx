declare namespace MuixDrawer {

  type modalProps = 'root' | 'hidden'

  type Shape = ReactXX.OverwriteShape<{
    common: ReactXX.ShapeViews<modalProps | 'docked'
    | 'paper' | 'paperAnchorLeft' | 'paperAnchorRight' | 'paperAnchorTop' | 'paperAnchorBottom' | 'paperAnchorDockedLeft' | 'paperAnchorDockedTop' | 'paperAnchorDockedRight' | 'paperAnchorDockedBottom'
    | 'modal'>
    props: Muix.DrawerProps
  }>

}

declare namespace ReactXX {
  interface SheetsX {
    MuiDrawer?: ReactXX.PartialSheetX<MuixDrawer.Shape>
  }
}


