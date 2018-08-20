import * as Queries from '../../utils/queries'
import * as Ast from '../../utils/ast'
import * as Parser from '../../utils/parser'

// in render: 'const {???} = props' transform to 'const {$system: {classNames, classNamesStr, theme}, ???} = props'
// vyhodit 'theme' z props, 
export const extractThemeInRender = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  if (!info.renderFunc) return
  const all = Ast.astq().query(info.renderFunc.body, '/VariableDeclaration/VariableDeclarator [ // Identifier [@name == "props"] ]')
  // all.length===0: CSSBaseLine
  // all.length>1: BottomNavigation
  const selectProps = all && all.length > 0 ? all[0] : null
  if (!selectProps) return root
  const place: any[] = selectProps.id.properties;
  const themeIdx = place.findIndex(pl => pl.key && pl.key.name === 'theme');
  if (themeIdx >= 0)
    place.splice(themeIdx, 1);
  (place as Array<any>).splice(0, 0, constSelectFromObjectAST)
  Ast.removeIgnored(root)
  Ast.removeTemporaryFields(root)
  return root
}

const constSelectFromObjectAST = {
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
      //************ CLASSNAMES
      // {
      //   "type": "ObjectProperty",
      //   "method": false,
      //   "key": {
      //     "type": "Identifier",
      //     "start": 39,
      //     "name": "classNames"
      //   },
      //   "computed": false,
      //   "shorthand": true,
      //   "value": {
      //     "type": "Identifier",
      //     "name": "classNames"
      //   },
      //   "extra": {
      //     "shorthand": true
      //   }
      // },
      // {
      //   "type": "ObjectProperty",
      //   "method": false,
      //   "key": {
      //     "type": "Identifier",
      //     "name": "classNamesStr"
      //   },
      //   "computed": false,
      //   "shorthand": true,
      //   "value": {
      //     "type": "Identifier",
      //     "name": "classNamesStr"
      //   },
      //   "extra": {
      //     "shorthand": true
      //   }
      // },
      // {
      //   "type": "ObjectProperty",
      //   "method": false,
      //   "key": {
      //     "type": "Identifier",
      //     "name": "classNamesAny"
      //   },
      //   "computed": false,
      //   "shorthand": true,
      //   "value": {
      //     "type": "Identifier",
      //     "name": "classNamesAny"
      //   },
      //   "extra": {
      //     "shorthand": true
      //   }
      // },
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