import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'
import * as Parser from '../../utils/parser'

export const removeDefaultExport = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  const body: any[] = Queries.checkSingleResult(Ast.astq().query(root, `/Program`)).body
  const defaultExport = Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExportDefaultDeclaration`), true)
  if (!defaultExport) return
  const defaultExportIdx = body.indexOf(defaultExport);
  body.splice(defaultExportIdx, 1)
}
