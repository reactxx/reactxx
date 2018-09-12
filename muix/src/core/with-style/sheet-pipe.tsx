import { TWithStyles } from '../index-d'
import { adjustSheet } from '../extend-reacts/adjust-sheet'
import { createWithTheme } from '../with-theme/theme-pipe'
import { classNamesForBind } from '../extend-reacts/class-names'


export const sheetPipe:TWithStyles.Pipe = (context, next) => {
  const {props, codeProps, sheetOrCreator, theme } = context
  const { value: sheet, theme: theme2 } = createWithTheme(sheetOrCreator, theme, context.componentId)
  const { value: classes, theme: theme3 }= createWithTheme(props.classes, theme2)
  const { value: classNameX, theme: theme4 }= createWithTheme(props.classNameX, theme3)
  const { value: styleX, theme: theme5 }= createWithTheme(props.styleX, theme4)
  //const { value: classes, theme: theme3 }= createWithTheme(props.classNameX, theme2)
  context.theme = theme5
  codeProps.classNameX = classNameX
  codeProps.styleX = styleX
  codeProps.classes = adjustSheet(sheet, classes)
  codeProps.sheetQuery = { whenUsed: {} }
  codeProps.classNames = classNamesForBind.bind(codeProps)
  return next
}
