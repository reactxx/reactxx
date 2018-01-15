declare namespace MuixDrawer {

  type modalProps = 'root' | 'hidden' | 'style'

  type Shape = Overwrite<Muix.DefaultEmptyShape, {
    common: Muix.ShapeViews<modalProps | 'docked'
    | 'paper' | 'paperAnchorLeft' | 'paperAnchorRight' | 'paperAnchorTop' | 'paperAnchorBottom' | 'paperAnchorDockedLeft' | 'paperAnchorDockedTop' | 'paperAnchorDockedRight' | 'paperAnchorDockedBottom'
    | 'modal'>
    props: Partial<OmitFrom<Muix.DrawerProps, 'classes' | 'style' | 'className'>>
  }>

}

declare namespace Muix {
  interface SheetsX {
    MuiDrawer?: Muix.SheetXOrCreator<Shape>
  }
}


