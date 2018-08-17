import * as Ast from '../utils/ast'
import { cssjsToFela } from './ast/cssjs-to-fela'

import { extractThemeInClassMethod } from './ast/extractThemeInClassMethod'
import { adjustPaddingMargins } from './ast/adjustPaddingMargins'
import { adjustImports } from './ast/adjustImports'
import { refactorClassNamesConditions } from './ast/refactorClassNamesConditions'
import { extractThemeInRender } from './ast/extractThemeInRender'
import { defaultExport } from './ast/defaultExport'

export const classNamesFix = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  adjustImports(root, info)
  extractThemeInRender(root, info)
  refactorClassNamesConditions(root, info)
  //adjustHtmlClassNameAttribute(root, info)
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

export const withThemeTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  adjustImports(root, info)
  return root
}

export const otherTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  adjustImports(root, info)
  return root
}



