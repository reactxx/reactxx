declare namespace MuixDrawer {

  type modalProps = 'root' | 'hidden'

  type Shape = Muix.OverwriteShape<{
    common: Prim5s.ShapeViews<modalProps | 'docked'
    | 'paper' | 'paperAnchorLeft' | 'paperAnchorRight' | 'paperAnchorTop' | 'paperAnchorBottom' | 'paperAnchorDockedLeft' | 'paperAnchorDockedTop' | 'paperAnchorDockedRight' | 'paperAnchorDockedBottom'
    | 'modal'>
    props: Muix.DrawerProps
  }>

}

declare namespace Prim5s {
  interface SheetsX {
    MuiDrawer?: Muix.SheetXOrCreator<MuixDrawer.Shape>
  }
}


