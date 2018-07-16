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

//const res = fs.readFileSync(`d:/reactxx/muix/trash/mui/index.tsx`, {encoding:'utf-8'});


const code = `
import {parse} from '@babel/parser';
import generate from '@babel/generator';

const code = ''
const ast = parse(code);

const x = <Comp
par={<SubComp>aasdfasdf</SubComp>}>
XXX</Comp>


const ignores = {    start: true,
    end: true, loc: true,
    sourceType: true,
    interpreter: true,
    directives: true,
    comments: true,
}

function removeIgnored (root) {
    for (const p in root) {       const value = root[p]
        if (!ignores[p]) {
            if (value && typeof value === 'object') removeIgnored(value)
        } else
            delete root[p]
    }
}

removeIgnored(ast)

const json = JSON.stringify(ast, null, 2)

let output = generate(ast, { /* options */ }, code);
output = null
`;

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

const astq = new ASTQ();

const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
removeIgnored(ast)

const subNodeOld: Array<Object> = astq.query(ast, `
  //Program/VariableDeclaration [ /VariableDeclarator/Identifier [ @name == 'code' ] ]
`)[0]


const subNode = parse(`const code = 'xxx'`);
removeIgnored(subNode)
const subNodeNew = astq.query(subNode, `// VariableDeclaration`)[0]
const resSubnode = JSON.stringify([subNodeOld, subNodeNew], null, 2);
for (const p in subNodeOld) delete subNodeOld[p]
Object.assign(subNodeOld, subNodeNew);

let output = generate(ast, { /* options */ }, code);
const prettydiffOutput = format(output.code, { parser: (text, parsers, options) => ast })


output = null;