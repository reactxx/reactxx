import { toPlatformSheet } from 'muix-styles/current/createMuiTheme'

export const sheetCreator = <R extends Mui.Shape>(sheetGetter: Mui.SheetGetter<R>) => (theme: Mui.Theme) => toPlatformSheet(sheetGetter(theme) as Mui.PartialSheetX<R>)