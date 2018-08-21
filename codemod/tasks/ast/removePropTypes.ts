import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'

export const removePropTypes = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  const body: any[] = Queries.checkSingleResult(Ast.astq().query(root, `/Program`)).body
  const propTypes = Queries.getStaticProp(root, info.name, 'propTypes')
  if (propTypes) {
    const propTypesIdx = body.indexOf(propTypes)
    body.splice(propTypesIdx, 1)
  }
}

