// Tabs.js: scrollSelectedIntoView a updateIndicatorState: 'theme' nahradit '$system: {theme},'

import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as Parser from '../utils/parser'
import { cssjsToFela } from './cssjs-to-fela'

export const classNamesFix = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  adjustImports(root)
  selectClassNamesFromProps(root, info.name)
  refactorClassNamesObjectExpressionAttribute(root)
  adjustHtmlClassNameAttribute(root, info.name)
  adjustPaddingMargins(root)
  adjustTheme(root, info)
  return root
}


export const withStylesTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  cssjsToFela(root, info)
  classNamesFix()(root, info)
  defaultExport(root, info)
  return root
}

export const withThemeTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  adjustImports(root)
  return root
}

export const otherTaskDefaultCreator = () => (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  adjustImports(root)
  return root
}

const adjustTheme = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
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

const adjustPaddingMargins = (root: Ast.Ast) => {
  const margin = adjustPaddingMarginsLow(root, 'margin')
  const padding = adjustPaddingMarginsLow(root, 'padding')
  if (margin || padding)
    addToAtomicImport(root)
}
// replace single margin's and padding's with toAtomic() spread
const adjustPaddingMarginsLow = (root: Ast.Ast, marginPadding: 'padding' | 'margin') => {
  let modified = false
  const styles = Queries.checkSingleResult(Ast.astq().query(root, '/Program/ExportNamedDeclaration/VariableDeclaration/VariableDeclarator [ /Identifier [@name=="styles"] ] //ObjectExpression '), true)
  if (!styles) return
  const rulesets: any[] = Ast.astq().query(styles, `// ObjectExpression [ /ObjectProperty [ /Identifier [ @name=="${marginPadding}" ] ] ]`)
  if (rulesets.length === 0) return
  rulesets.forEach(({ properties }) => {
    const parsed: any[] = properties.map(obj => parseValue(marginPadding, obj.key && obj.key.name === marginPadding && obj.value))
    // process in reverse order
    parsed.reverse().forEach((newValue, idx) => {
      if (!newValue) return
      modified = true
      // replace single margin with spread operator
      properties.splice(parsed.length - idx - 1, 1)
      properties.splice(0, 0, newValue)
    })
  })
  const dev = Parser.generateCode(styles)
  return modified
}
const addToAtomicImport = (root: Ast.Ast) => {
  const body = Queries.checkSingleResult(Ast.astq().query(root, `// Program`)).body as any[];
  const idx = body.findIndex(imp => imp.type === 'ImportDeclaration')
  body.splice(idx + 1, 0, Parser.parseCode(`import { toAtomic } from '../styles/withStyles';`))
}
const parseValue = (prefix: string, value) => {
  if (!value) return null
  return {
    "type": "SpreadElement",
    "argument": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "toAtomic"
      },
      "arguments": [
        {
          "type": "StringLiteral",
          "extra": {
            "rawValue": prefix,
            "raw": `'${prefix}'`
          },
          "value": prefix
        },
        value
      ]
    }
  }
}

const adjustImports = (root: Ast.Ast) => {
  const imports = Ast.astq().query(root, `// ImportDeclaration`)
  imports.forEach(imp => {
    if (imp.source.type != 'StringLiteral') return
    if (imp.source.value === 'classNames') {
      Ast.removeNode(root, imp.$path)
      return
    }
    const newValue = importRepairs[imp.source.value]
    if (newValue)
      imp.source.value = newValue
    return
    // const id = Queries.checkSingleResult(Ast.astq().query(imp, '/ImportDefaultSpecifier/Identifier' || '/ImportSpecifier/Identifier'), true)
    //   if (id && id.name === 'classNames') {
    //     Ast.removeNode(root, imp.$path)
    //     return
    //   } else {
    //     const newValue = importRepairs[imp.source.value]
    //     if (newValue)
    //       imp.source.value = newValue
    //     return
    //   }
  })
}
const importRepairs = {
  '../ButtonBase': '../ButtonBase/ButtonBase',
  '../Paper': '../Paper/Paper',
  '../ListItem': '../ListItem/ListItem',
  '../Portal': '../Portal/Portal',
  '../Input': '../Input/Input',
  '../InputLabel': '../InputLabel/InputLabel',
  '../FormLabel': '../FormLabel/FormLabel',
  '../FormControl': '../FormControl/FormControl',
  '../FormHelperText': '../FormHelperText/FormHelperText',
  '../Select': '../Select/Select',
  '../../SvgIcon': '../../SvgIcon/SvgIcon',
  '../Popover': '../Popover/Popover',
  '../MenuList': '../MenuList/MenuList',
  '../Modal': '../Modal/Modal',
  '../Grow': '../Grow/Grow',
  '../List': '../List/List',
  '../RootRef': '../RootRef/RootRef',
  '../Backdrop': '../Backdrop/Backdrop',
  '../Fade': '../Fade/Fade',
  '../Typography': '../Typography/Typography',
  '../FormGroup': '../FormGroup/FormGroup',
  '../IconButton': '../IconButton/IconButton',
  '../Button': '../Button/Button',
}
const unknownComponents = [
  'ComponentProp',
  'Component',
  'TransitionGroup',
]

export const getRenderFunc = (root: Ast.Ast, functionName: string) => {
  return Queries.getNode_functionGlobal(root, functionName, true) || Queries.getNode_classMethod(root, functionName, 'render')
}

// for 'className' attribute HTML tags (e.g. 'span' etc. - not components as 'Button'): expand ruleset to className list (by means of classNamesStr function)
// - 'className={classNames(x)}' by 'className={classNamesStr(x)}'
// - 'className={x}' by 'className={classNamesStr(x)}'
const adjustHtmlClassNameAttribute = (root: Ast.Ast, functionName: string) => {
  const func = getRenderFunc(root, functionName)
  const htmls = Ast.astq().query(func.body, '// JSXElement [ /JSXOpeningElement/JSXIdentifier [ isHTMLTag(@name, {forceHTMLTags}) ] && // JSXAttribute/JSXIdentifier [ @name=="className" ] ]', { forceHTMLTags: unknownComponents || null }) as Ast.Ast[]
  const classNames = 'classNames('
  htmls.forEach(html => {
    const compName: string = html.openingElement.name.name
    const classNameProc = compName === 'TransitionGroup' || compName.charAt(0).toLowerCase() === compName.charAt(0) ? 'classNamesStr(' : `classNamesAny(${compName},`
    const clasName = Queries.checkSingleResult(Ast.astq().query(html, '/JSXOpeningElement/JSXAttribute [ /JSXIdentifier [ @name=="className" ] ]'))
    const oldCode = Parser.generateCode(clasName.value.expression)
    const newCode = oldCode.startsWith(classNames) ? classNameProc + oldCode.substr(classNames.length) : `${classNameProc}${oldCode})`
    clasName.value.expression = Parser.parseExpressionLow(newCode)
  })
  return root
}

// refactor all calls of 'classNames' in render function: its ObjectExpression attribute, e.g. 'classNames(...,{x:y},...)' replace by 'classNames(...,(y) && (x),...)'
const refactorClassNamesObjectExpressionAttribute = (root: Ast.Ast) => {
  const calls = Ast.astq().query(root, `// CallExpression [ /Identifier [@name == "classNames"] && /ObjectExpression ]`)
  calls.forEach(call => {
    // check, if every 'classNames(classes.root ??? ' ends with ' ???, classNameProp)'
    if (call.arguments.length >= 2) {
      const first = Parser.generateCode(call.arguments[0])
      const last = Parser.generateCode(call.arguments[call.arguments.length - 1])
      if (first === 'classes.root' && (last != 'classNameProp' && last != 'className')) {
        // for Modal.js and StepIcon.js
        const x = 0
      }
    }
    // refactor
    const newArguments = []
    call.arguments.forEach(arg => {
      if (arg.type != 'ObjectExpression') { newArguments.push(arg); return }
      arg.properties.forEach(prop => {
        const left = Parser.generateCode(prop.key)
        const right = Parser.generateCode(prop.value)
        newArguments.push(Parser.parseExpressionLow(`(${right}) && (${left})`))
      })
    })
    call.arguments = newArguments
  })
  return root
}

// in render: 'const {???} = props' transform to 'const {$system: {classNames, classNamesStr, theme}, ???} = props'
// vyhodit 'theme' z props, 
const selectClassNamesFromProps = (root: Ast.Ast, functionName: string) => {
  const func = getRenderFunc(root, functionName)
  const all = Ast.astq().query(func.body, '/VariableDeclaration/VariableDeclarator [ // Identifier [@name == "props"] ]')
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

const defaultExport = (root: Ast.Ast, info: Ast.MUISourceInfo) => {
  const body: any[] = Queries.checkSingleResult(Ast.astq().query(root, `/Program`)).body
  const getStaticProp = (propName: string) => Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExpressionStatement [/AssignmentExpression/MemberExpression [ /Identifier [ @name=="${info.name}"] && /Identifier [ @name=="${propName}"] ] ]`), true)
  // remove e.g. Button.propTypes
  const propTypes = getStaticProp('propTypes');
  if (propTypes) {
    const propTypesIdx = body.indexOf(propTypes);
    body.splice(propTypesIdx, 1)
  }
  // remove withStyles call (ans save mui name)
  //let muiName:string 
  if (info.withStyles) {
    // const muiNameItem = Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExportDefaultDeclaration//ObjectExpression/ObjectProperty [ /Identifier [@name=="name"] ] /StringLiteral`), true)
    // muiName = muiNameItem && muiNameItem.value
    const defaultExport = Queries.checkSingleResult(Ast.astq().query(root, `/Program/ExportDefaultDeclaration`))
    const defaultExportIdx = body.indexOf(defaultExport);
    body.splice(defaultExportIdx, 1)
  }
  // refactor e.g. 'Button.defaultProps = ...' to 'const defaultProps = ...'
  if (info.withStyles) {
    const defaultProps = getStaticProp('defaultProps')
    // default props to string
    const defaultPropsStr = defaultProps ? Parser.generateCode(defaultProps.expression.right) : '{}'
    // remove defaultProps
    if (defaultProps) {
      const defaultPropsIdx = body.indexOf(defaultProps);
      body.splice(defaultPropsIdx, 1)
    }
    body.push(Parser.parseCode(`const defaultProps = ${info.name}.defaultProps = ${defaultPropsStr};`))
  }

  // e.g.
  // 'export const ButtonCreator...'
  // 'const ButtonComponent = ButtonCreator()'
  // 'export default ButtonComponent'
  if (info.withStyles) {
    const defaultExport = Parser.parseCode(`
/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/${info.dir}/${info.name}').Shape>}
*/
export const ${info.name}Creator = withStyles(styles, ${info.name}, {isMui:true, defaultProps});
const ${info.name}Component  = ${info.name}Creator();
if (${info.name}.muiName) ${info.name}Component.muiName = ${info.name}.muiName;
export default ${info.name}Component;
    `)
    Array.prototype.push.call(body, ...defaultExport.program.body)
  }
  return root
}

/* 
$system: {
    classNames,
    classNamesStr,
    classNamesAny,
    theme
}
*/
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
      {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "start": 39,
          "name": "classNames"
        },
        "computed": false,
        "shorthand": true,
        "value": {
          "type": "Identifier",
          "name": "classNames"
        },
        "extra": {
          "shorthand": true
        }
      },
      {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "name": "classNamesStr"
        },
        "computed": false,
        "shorthand": true,
        "value": {
          "type": "Identifier",
          "name": "classNamesStr"
        },
        "extra": {
          "shorthand": true
        }
      },
      {
        "type": "ObjectProperty",
        "method": false,
        "key": {
          "type": "Identifier",
          "name": "classNamesAny"
        },
        "computed": false,
        "shorthand": true,
        "value": {
          "type": "Identifier",
          "name": "classNamesAny"
        },
        "extra": {
          "shorthand": true
        }
      },
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

let res
//res = Parser.generateCode(selectClassNamesFromProps(Parser.parseCode('function Test () { const {xxx} = props }'), 'Test'))
//res = Parser.generateCode(selectClassNamesFromProps(Parser.parseCode('class Test { render() { const {xxx} = props } }'), 'Test'))

//res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('function Test () { const x = <span className={classes.label}><span className={classes.label}/></span> }'), 'Test'))
//res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('class Test { render () { const x = <span className={classes.label}><span className={classes.label}/></span> } }'), 'Test'))
//res = Parser.generateCode(adjustHtmlClassName(Parser.parseCode('class Test { render () { const x = <span className={classNames(classes.label, classes.root)}><span className={classes.label}/></span> } }'), 'Test'))

//res = Parser.generateCode(refactorClassNames(Parser.parseCode('classNames( xx, { [classes.label + "xxx"]: a || b }, yy)')))

// res = Parser.generateCode(propTypesAndDefaultProps(Parser.parseCode(`
// Button.propTypes = {
// };
// Button.defaultProps = {
//     x:0
// };
// export default withStyles(styles, {
//   name: 'MuiButton'
// })(Button);
// `), 'Button'))

res = null
