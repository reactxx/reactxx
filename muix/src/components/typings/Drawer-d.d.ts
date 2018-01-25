declare namespace MuixDrawer {

  type modalProps = 'root' | 'hidden'

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<modalProps | 'docked'
    | 'paper' | 'paperAnchorLeft' | 'paperAnchorRight' | 'paperAnchorTop' | 'paperAnchorBottom' | 'paperAnchorDockedLeft' | 'paperAnchorDockedTop' | 'paperAnchorDockedRight' | 'paperAnchorDockedBottom'
    | 'modal'>
    props: Muix.DrawerProps
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiDrawer?: Muix.SheetXOrCreator<Shape>
  }
}


