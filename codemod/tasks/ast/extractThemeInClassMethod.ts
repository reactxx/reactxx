import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'

// In some method or functional properties of CodeComponent (e.g. Collapse): const {theme} = props => const { $system: {theme}} = props
export const extractThemeInClassMethod = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
    if (!info.adjustThemeMethods && !info.adjustThemeProperties) return
    const toAdjust = info.adjustThemeMethods && info.adjustThemeProperties ? [...info.adjustThemeMethods, ...info.adjustThemeProperties] : (info.adjustThemeMethods ? info.adjustThemeMethods : info.adjustThemeProperties)
    toAdjust.forEach(methodName => {
      const method = Queries.checkSingleResult(
        info.adjustThemeMethods && info.adjustThemeMethods.indexOf(methodName) >= 0
          ? Ast.astq().query(root, `// Program/ClassDeclaration [ /Identifier [@name == "${info.name}"] ] // ClassMethod [ /Identifier [ @name == "${methodName}"] ]`)
          : Ast.astq().query(root, `// Program/ClassDeclaration [ /Identifier [@name == "${info.name}"] ] // ClassProperty [ /Identifier [ @name == "${methodName}"] ] / ArrowFunctionExpression`))
      const selectProps = Queries.checkSingleResult(Ast.astq().query(method.body, '/VariableDeclaration/VariableDeclarator [ // Identifier [@name == "props"] ]'))
      const place: any[] = selectProps.id.properties;
      const themeIdx = place.findIndex(pl => pl.key && pl.key.name === 'theme');
      if (themeIdx >= 0)
        place.splice(themeIdx, 1);
      (place as Array<any>).splice(0, 0, constSelectTheme)
    })
  }
  const constSelectTheme = {
    "type": "ObjectProperty",
    "method": false,
    "key": {
      "type": "Identifier",
      "name": "$system"
    },
    "computed": false,
    "shorthand": false,
    "value": {
      "type": "ObjectPattern",
      "properties": [
        {
          "type": "ObjectProperty",
          "method": false,
          "key": {
            "type": "Identifier",
            "name": "theme"
          },
          "computed": false,
          "shorthand": true,
          "value": {
            "type": "Identifier",
            "name": "theme"
          },
          "extra": {
            "shorthand": true
          }
        }
  
      ]
    }
  }