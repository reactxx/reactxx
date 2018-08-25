import * as Ast from '../../utils/ast'
import { cssjsToFela } from './cssjs-to-fela'

import { extractThemeInClassMethod } from './extractThemeInClassMethod'
import { adjustPaddingMargins } from './adjustPaddingMargins'
import { refactorClassNamesConditions } from './refactorClassNamesConditions'
import { extractThemeInRender } from './extractThemeInRender'
import { defaultExport } from './defaultExport'
import { removePropTypes } from './removePropTypes'

export const classNamesFix = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  extractThemeInRender(root, info)
  refactorClassNamesConditions(root, info)
  adjustPaddingMargins(root, info)
  extractThemeInClassMethod(root, info)
  return root
}


export const withStylesTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  cssjsToFela(root, info)
  classNamesFix()(root, info)
  defaultExport(root, info)
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



