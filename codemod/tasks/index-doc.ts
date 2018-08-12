import * as Glob from 'glob'
import * as fs from 'fs'
import * as Config from '../utils/config'
import * as Queries from '../utils/queries'
import * as Ast from '../utils/ast'
import * as fsExtra from 'fs-extra';
import * as Tasks from './default-modifier'
import { readAllCodes } from '.'
import { join } from 'path';
import { match } from 'minimatch';
import { parse, parseExpression } from '@babel/parser';
import generate from '@babel/generator';

export const codeModDoc = () => {

    const { log, codeStr, code } = readAllCodes()

    try { fsExtra.emptyDirSync(Config.muiWeb) } catch { }

    // refresh list of all example files (save to ./doclist.ts)
    // const _ignoreAll = {}
    // Object.keys(log).forEach(k => _ignoreAll[k] = true)
    // const ignoreAllStr = JSON.stringify(_ignoreAll, null, 2)

    const exampleGroups: { [group: string]: string[] } = {}

    for (const path in log) {
        const logp = log[path]

        // ignore some examples
        if (ignores[path]) continue

        // code string modification
        let code = codeStr[path]
        let codeDest = codeModFile(code, path)

        // code AST modification
        const ast = parseCodeLow(codeDest)
        adjustHtmlClassNameAttribute(ast)
        code = generateCode(ast)

        // output code
        fsExtra.outputFileSync(logp.srcPath.replace('.js', '.tsx'), code);

        // register example
        if (logp.name.charAt(0).toUpperCase() === logp.name.charAt(0))
            (exampleGroups[logp.dir] || (exampleGroups[logp.dir] = [])).push(logp.name)
    }

    // generate index.ts files
    for (const p in exampleGroups) {
        const examples = exampleGroups[p]
        const imports = examples.map(e => `import ${e} from './${e}'`).join('\n')
        const comps = examples.map(e => 
`<h2>${e}</h2>
<div style={{flexShrink: 0}}>
  <${e}/>
</div>
`).join('\n')
        const code =
            `
import React from 'react';

${imports}

const App: React.SFC = () => <div style={{padding: 30, overflow:'auto'}}>
  ${comps}
</div>

export default App
`
        const fn = `${Config.muiWeb}${p}/index.tsx/`
        fsExtra.outputFileSync(fn, code)
    }
}

const parseExpressionLow = (code: string) => parseExpression(code, { plugins: ['jsx', 'objectRestSpread', 'classProperties', 'typescript'] });
const parseCodeLow = (code: string) => parse(code, { sourceType: 'module', plugins: ['jsx', 'objectRestSpread', 'classProperties', 'typescript'] });
const generateCode = (ast: Ast.Ast) => generate(ast, { /* options */ }).code as string

const adjustHtmlClassNameAttribute = (root: Ast.Ast) => {
    const htmls = Ast.astq().query(root, '// JSXElement [ /JSXOpeningElement/JSXIdentifier [ isHTMLTag(@name, {forceHTMLTags}) ] ]', { forceHTMLTags: null }) as Ast.Ast[]
    const classNames = 'classNames('
    htmls.forEach(html => {
        const compName: string = html.openingElement.name.name
        const classNameProc = compName === 'TransitionGroup' || compName.charAt(0).toLowerCase() === compName.charAt(0) ? 'classNamesStr(' : `classNamesAny(${compName},`
        const clasName = Queries.checkSingleResult(Ast.astq().query(html, '/JSXOpeningElement/JSXAttribute [ /JSXIdentifier [ @name=="className" ] ]'), true)
        if (!clasName) return
        const oldCode = generateCode(clasName.value.expression)
        const newCode = oldCode.startsWith(classNames) ? classNameProc + oldCode.substr(classNames.length) : `${classNameProc}${oldCode})`
        clasName.value.expression = parseExpressionLow(newCode)
    })
    return root
}


const codeModFile = (example: string, path: string) => {
    switch (path) {
        case 'autocomplete/IntegrationDownshift':
            example = processMatchAll(/startAdornment(\s|.)*?(}\),)/g, example, (match, res) => res.push(example.substr(match.index, match[0].length - 3) + '} as any),'))
            break
        case 'buttons/CustomizedButtons':
        case 'text-fields/CustomizedInputs':
            example = example.replace(`import { withStyles, MuiThemeProvider, createMuiTheme } from \'@material-ui/core/styles\';`,
                `import { ThemeProvider } from 'reactxx-basic';
import createMuiTheme from 'reactxx-mui-web/styles/createMuiTheme';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'`)
            example = replaceAll(example, '<MuiThemeProvider theme={theme}>', '<ThemeProvider theme={theme as any}>')
            example = replaceAll(example, 'MuiThemeProvider', 'ThemeProvider')
            break
        case 'menus/MenuListComposition':
            example = replaceAll(example, `  handleToggle = () => {`, `  anchorEl\n  handleToggle = () => {`)
            example = replaceAll(example, 'id="menu-list-grow"', '{...{id:"menu-list-grow"}}')
            break
        case 'snackbars/ConsecutiveSnackbars':
        case 'snackbars/SimpleSnackbar':
            example = replaceAll(example, 'handleClose = (event, reason)', 'handleClose = (event, reason?)')
            break
        case 'steppers/HorizontalLinearStepper':
        case 'steppers/HorizontalNonLinearStepperWithError':
            example = replaceAll(example, 'const props = {};', 'const props: any = {};')
            example = replaceAll(example, 'const labelProps = {};', 'const labelProps: any = {};')
            break
        case 'steppers/HorizontalNonLinearAlternativeLabelStepper':
            example = replaceAll(example, 'const props = {};', 'const props: any = {};')
            example = replaceAll(example, 'const buttonProps = {};', 'const buttonProps: any = {};')
            break
        case 'tables/CustomPaginationActionsTable':
            example = replaceAll(example, '(\n  TablePaginationActions,\n);', '(TablePaginationActions);')
            break
        case 'tables/EnhancedTable':
            example = replaceAll(example, 'let EnhancedTableToolbar = ', 'let EnhancedTableToolbar: any = ')
            break
        case 'selects/MultipleSelect':
            example = replaceAll(example, 'renderValue={selected =>', 'renderValue={(selected: any) =>')
            example = processMatchAll(/style={{(\s|.)*?(}})/g, example, (match, res) => res.push(example.substr(match.index, match[0].length - 3) + '} as any}'))
            break
        case 'progress/CircularIndeterminate':
            example = replaceAll(example, '{ color: purple[500] }', '{ color: purple[500] } as any')
            break
        case 'tables/CustomizedTable':
            const endPart = '}))(TableCell);'
            example = processMatchAll(/withStyles\(theme(\s|.)*?(}\)\)\(TableCell\);)/g, example, (match, res) => res.push(example.substr(match.index, match[0].length - endPart.length) + '} as any), TableCell as any)() as typeof TableCell;'))
            example = replaceAll(example, 'const CustomTableCell = withStyles(', 'const CustomTableCell = withStylesCreator(')
            break
    }

    example = importComponent(example)
    example = importIcon(example)
    example = withStyles(example)

    example = replaceAll(example, '\n  state = {', '\n  state: any = {')
    example = replaceAll(example, `import { withStyles } from '@material-ui/core/styles';`, `import withStylesCreator from 'reactxx-mui-web/styles/withStyles'`)
    example = replaceAll(example, `.propTypes = {`, `['propTypes'] = {`)
    example = replaceAll(example, `extends React.Component {`, `extends React.Component<any,any> {`)
    example = replaceAll(example, `@material-ui/core/`, `reactxx-mui-web/`)
    example = replaceAll(example, `/static/images/`, `src/ks/common/muix/static/images/`)
    example = example.replace(`\nimport`, `\nimport {mergeRulesets as classNamesStr} from 'reactxx-primitives';\nimport`)

    return example
}


// const replaces = [
//     { src: `import { withStyles } from '@material-ui/core/styles';`, dest: `import withStylesCreator from 'reactxx-mui-web/styles/withStyles'` },
//     { src: '@material-ui/core/', dest: 'reactxx-muix/current/' },
//     { src: 'withStyles(styles', dest: 'withStylesCreator(styles as any, {}' },
// ]

const string2RegExpLiteral = (str: string) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
const replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(string2RegExpLiteral(find), 'g'), replace);

const matchAll = (regEx: RegExp, str: string, onMatch: (match: RegExpExecArray | null, lastIdx: number) => void) => {
    let lastIdx = 0
    while (true) {
        const match: RegExpExecArray = regEx.exec(str)
        if (!match) break
        onMatch(match, lastIdx)
        lastIdx = match.index + match[0].length
    }
    onMatch(null, lastIdx)
}

const processMatchAll = (regEx: RegExp, str: string, onMatch: (match: RegExpExecArray | null, res: string[]) => void) => {
    const res: string[] = []

    matchAll(regEx, str, (match, idx) => {
        const matchIdx = match ? match.index : str.length
        if (matchIdx > idx) res.push(str.substring(idx, matchIdx))
        if (match) onMatch(match, res)
    })

    return res.join('')
}

const importComponent = (example: string) => processMatchAll(importComponentRegExp, example, (match, res) => {
    let matchStr = example.substr(match.index, match[0].length - 2)
    res.push(matchStr.replace('@material-ui/core/', 'reactxx-muix/current/'))
    res.push('/')
    res.push(match[1])
    res.push("';")
})
const importComponentRegExp = /^import ([A-Z]\w+).*@material-ui\/core\/\w+';/gm

const importIcon = (example: string) => processMatchAll(importIconRegExp, example, (match, res) => {
    res.push(example.substr(match.index, match[0].length).replace('@material-ui/icons/', 'reactxx-icons/'))
})
const importIconRegExp = /^import .*@material-ui\/icons\//gm

const withStyles = (example: string) => processMatchAll(withStylesRegExp, example, (match, res) => {
    res.push(`withStylesCreator(${match[1]} as any, ${match[3]}${match[2]})();`)
})
const withStylesRegExp = /withStyles\((\w+)(.*?)\)\((\w+)\);$/gm

const ignores = {
    'autocomplete/IntegrationAutosuggest': true,
    'autocomplete/IntegrationReactSelect': true,
    'snackbars/CustomizedSnackbars': true,
    'chips/ChipsPlayground': true,
}

