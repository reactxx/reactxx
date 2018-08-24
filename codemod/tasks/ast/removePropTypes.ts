import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'

export const removePropTypes = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  const body: any[] = Queries.checkSingleResult(Ast.astq().query(root, `/Program`)).body
  while (true) { // Tooltip has two propTypes assignments
    let propTypes = Queries.getStaticProp(root, info.name, 'propTypes')
    if (!propTypes) break
    const propTypesIdx = body.indexOf(propTypes)
    body.splice(propTypesIdx, 1)
  }
}

