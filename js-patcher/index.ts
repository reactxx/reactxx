
//https://babeljs.io/docs/en/next/babel-generator
//https://babeljs.io/docs/en/next/babel-parser.html
import { parse } from '@babel/parser';
import generate from '@babel/generator';
//https://nodejs.org/api/fs.html
import * as fs from 'fs';
//https://github.com/isaacs/node-glob
//import * as glob from 'glob'
//https://github.com/rse/astq
import * as ASTQ from 'astq'

import { format } from 'prettier'

import Button from './patches/Button/button'

const patches = [
    Button
]

const srcPath = ''
const destPath = ''

const run = () => {
    patches.forEach(patch => {
        patch.transform('')
    })
}

let code = fs.readFileSync('button.js', { encoding: 'utf-8' });

//code = `/*#####123*/let a=1`

const ignores = {
    start: true,
    end: true,
    loc: true,
    sourceType: true,
    interpreter: true,
    directives: true,
    comments: true,
}

function removeIgnored(root) {
    for (const p in root) {
        const value = root[p]
        if (!ignores[p]) {
            if (value && typeof value === 'object') removeIgnored(value)
        } else
            delete root[p]
    }
}

function addPath(root, parent?, nodeParent?, prop?: string, deep: number = 0) {
    if (prop) root.$path = parent && parent.$path ? parent.$path + '/' + prop : prop
    if (root.type) {
        root.$qpath = nodeParent && nodeParent.$qpath ? nodeParent.$qpath + '/' + root.type : root.type
        if (nodeParent && nodeParent.$path) root.$parentPath = nodeParent.$path
        root.$deep = deep
        nodeParent = root
        deep++
    }
    const isArray = Array.isArray(root)
    for (const p in root) {
        const value = root[p]
        if (!value || typeof value !== 'object') continue
        addPath(value, root, nodeParent, isArray ? `#${p}` : p, deep)
    }
}

const astq = new ASTQ();

astq.func(' ', (adapter, node) => {
    const parents = []
    while ((node = adapter.getParentNode(node)) !== null) {
        if (!node.type) continue
        parents.push(node.type)
    }
    return parents
})

const navigate = (root, path: string) => {
    if (!path) return null
    path.split('/').forEach(part => {
        if (part.charAt(0) === '#') root = root[parseInt(part.substr(1))]
        else root = root[part]
    })
    return root
}

const navigateAll = (ast, path: string) => {
    const res = []
    let x = navigate(ast, path)
    res.push(x)
    while (x.$parentPath) {
        x = navigate(ast, x.$parentPath)
        res.push(x)
    }
    return res
}

const removeTemporary = root => {
    for (const p in root) {
        if (p.charAt(0) === '$') delete root[p]
        const sub = root[p]
        if (sub && typeof sub === 'object') removeTemporary(sub)
    }
}

const removeUnusedArrayItems = (root, path: string) => {
    if (!path) return null
    const parts = path.split('/')
    removeTemporary(root)
    parts.forEach((part, idx) => {
        if (part.charAt(0) !== '#') {
            root = root[part]
            //if (part.charAt(0)==='$') delete root[part]
            return
        }
        const actIdx = parseInt(part.substr(1));
        (root as Array<any>).splice(actIdx + 1);
        (root as Array<any>).splice(0, actIdx);
        root = root[0]
        //removeUnusedArrayItems(root, path)
    })
}


const remove = (root, path: string) => {
    if (!path) return null
    const parts = path.split('/')
    parts.forEach((part, idx) => {
        const isDelete = idx === parts.length - 1
        if (part.charAt(0) === '#') {
            const actIdx = parseInt(part.substr(1))
            if (isDelete) (root as Array<any>).splice(actIdx, 1);
            else root = root[actIdx]
        } else {
            if (isDelete) delete root[part]
            else root = root[part]
        }
    })
}

const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'objectRestSpread'] });
removeIgnored(ast)
addPath(ast)

const subNodes = astq.query(ast,
    //`// * [/CommentBlock [ substr (@value,0,5)=='#####' ] ]`
    `// CommentBlock [ substr (@value,0,5)=='#####' ]`
)//.map(node => (node.$path as string).split('/'))

const parent = (qpath: string, level: number = 1) => {
    return level === 0 ? qpath : qpath.split('/').slice(0, -level).join('/')
}

const subNodesJSON = JSON.stringify(subNodes, null, 2)
const x = navigateAll(ast, subNodes[1].$path)

const toRemove = JSON.parse(JSON.stringify(ast))
removeUnusedArrayItems(toRemove, subNodes[2].$path)
const dump = JSON.stringify(toRemove, null, 2)


const importClassNames = astq.query(ast, '// ImportDeclaration [ /ImportDefaultSpecifier/Identifier [@name == "classNames"] ]')
remove(ast, importClassNames[0].$path) //, '*** REACTXX PATCH: remove classNames import')

const buttonFunction = astq.query(ast, '// Program/FunctionDeclaration [ /Identifier [@name == "Button"] ]')
const selectProps = astq.query(buttonFunction[0], '/BlockStatement/VariableDeclaration/VariableDeclarator [ /Identifier [@name == "props"] ]')

const place = selectProps[0].id.properties;
(place as Array<any>).splice(0, 0, JSON.parse(`
{
    "type": "ObjectProperty",
    "method": false,
    "key": {
      "type": "Identifier",
      "name": "classNames"
    },
    "computed": false,
    "shorthand": true,
    "value": {
      "type": "Identifier",
      "name": "classNames"
    },
    "trailingComments": [
      {
        "type": "CommentBlock",
        "value": "*** REACTXX PATCH: select classNames from props"
      }
    ]  
  }
`))

const span = astq.query(buttonFunction[0], '// ReturnStatement // JSXElement / JSXOpeningElement [ /JSXIdentifier [@name=="span"] ]')
const className = astq.query(span[0], '// JSXAttribute [ /JSXIdentifier [ @name == "className"] ] ')
className[0].value = JSON.parse(`{
    "type": "JSXExpressionContainer",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "Identifier",
        "name": "classNames"
      },
      "arguments": [
        {
          "type": "MemberExpression",
          "object": {
            "type": "Identifier",
            "name": "classes"
          },
          "property": {
            "type": "Identifier",
            "name": "label"
          },
          "computed": false
        }
      ],
      "trailingComments": [
        {
          "type": "CommentBlock",
          "value": "*** REACTXX PATCH: wrap class with classNames"
        }
      ]  
    }
  }`)


let output = generate(ast, { /* options */ }, code);
const prettydiffOutput = format('//x', { parser: (text, parsers, options) => ast })

code = null
