import * as Ast from '../../utils/ast'

import { extractThemeInClassMethod } from './extractThemeInClassMethod'
import { adjustPaddingMargins } from './adjustPaddingMargins'
import { refactorClassNamesConditions } from './refactorClassNamesConditions'
import { extractThemeInRender } from './extractThemeInRender'
import { transformDefaultProps } from './transform-default-props'
import { removeDefaultExport } from './remove-default-export'
import { transformConstStyles } from './transform-const-styles'
import { removePropTypes } from './removePropTypes'

export const classNamesFix = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  extractThemeInRender(root, info)
  refactorClassNamesConditions(root, info)
  adjustPaddingMargins(root, info)
  extractThemeInClassMethod(root, info)
  return root
}


export const withStylesTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  transformConstStyles(root, info)
  classNamesFix()(root, info)
  transformDefaultProps(root, info)
  if (info.withStylesOrTheme) removeDefaultExport(root, info)  
  return root
}

// export const withThemeTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
//   adjustImports(root, info)
//   return root
// }

// export const otherTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
//   adjustImports(root, info)
//   return root
// }



