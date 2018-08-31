import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'
import * as Parser from '../../utils/parser'

export const transformDefaultProps = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  // remove e.g. Button.propTypes
  if (!info.withStylesOrTheme) return
  const body: any[] = Queries.checkSingleResult(Ast.astq().query(root, `/Program`)).body
  // remove withStyles call
  const defaultExport = Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExportDefaultDeclaration`))
  const defaultExportIdx = body.indexOf(defaultExport);
  body.splice(defaultExportIdx, 1)

  // remove 'Button.defaultProps = ...', save defaults to info
  const defaultProps = Queries.getStaticProp(root, info.name, 'defaultProps')
  // default props to string
  info.defaultPropsStr = defaultProps ? Parser.generateCode(defaultProps.expression.right) : '{}'
  // remove defaultProps
  if (defaultProps) {
    const defaultPropsIdx = body.indexOf(defaultProps)
    body.splice(defaultPropsIdx, 1)
  }
}