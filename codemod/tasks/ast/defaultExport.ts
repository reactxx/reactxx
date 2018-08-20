import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'
import * as Parser from '../../utils/parser'

export const defaultExport = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
    const body: any[] = Queries.checkSingleResult(Ast.astq().query(root, `/Program`)).body
    const getStaticProp = (propName: string) => Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExpressionStatement [/AssignmentExpression/MemberExpression [ /Identifier [ @name=="${info.name}"] && /Identifier [ @name=="${propName}"] ] ]`), true)
    // remove e.g. Button.propTypes
    const propTypes = getStaticProp('propTypes')
    if (propTypes) {
      const propTypesIdx = body.indexOf(propTypes)
      body.splice(propTypesIdx, 1)
    }
    if (info.withStylesOrTheme) {
      // remove withStyles call
      const defaultExport = Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExportDefaultDeclaration`))
      const defaultExportIdx = body.indexOf(defaultExport);
      body.splice(defaultExportIdx, 1)
  
      // remove 'Button.defaultProps = ...', save defaults to info
      const defaultProps = getStaticProp('defaultProps')
      // default props to string
      info.defaultPropsStr = defaultProps ? Parser.generateCode(defaultProps.expression.right) : '{}'
      // remove defaultProps
      if (defaultProps) {
        const defaultPropsIdx = body.indexOf(defaultProps)
        body.splice(defaultPropsIdx, 1)
      }
    }
  
    // e.g.
    // 'export const ButtonCreator...'
    // 'const ButtonComponent = ButtonCreator()'
    // 'export default ButtonComponent'
    if (false && info.withStylesOrTheme) {
      const defaultExport = Parser.parseCode(`
  
  export const ${info.name}Code = ${info.name}
      
  export const ${info.name}Creator = withStyles(styles, ${info.name}, {isMui:true, defaultProps});
  
  export const ${info.name}Component = ${info.name}Creator();
  
  if (${info.name}.muiName) ${info.name}Component.muiName = ${info.name}.muiName;
  
  export default ${info.name}Component;
  `)
      Array.prototype.push.call(body, ...defaultExport.program.body)
    }
    return root
  }