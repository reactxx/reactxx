declare namespace Prim5s {
  type TextShape = OverwriteShape<{
    common: ShapeTexts<'root' | 'singleLineStyle' >
    web: 'pressable'
    props: { numberOfLines?: number } & TOnClickWeb
    propsWeb: React.HTMLAttributes<HTMLSpanElement>
    propsNative: ReactN.TextProperties
  }>
}

declare namespace Prim5s {
  interface SheetsX {
    BaseText?: Prim5s.SheetOrCreator<Prim5s.TextShape>
  }
}
