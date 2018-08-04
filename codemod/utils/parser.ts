import * as Ast from './ast'
import { parse, parseExpression } from '@babel/parser';
import generate from '@babel/generator';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as Config from './config';
import * as Prettier from 'prettier';

export const parseCodeLow = (code: string) => parse(code, { sourceType: 'module', plugins: ['jsx', 'objectRestSpread', 'classProperties'] });
export const parseExpressionLow = (code: string) => parseExpression(code, { plugins: ['jsx', 'objectRestSpread', 'classProperties'] });

export const parseCode = (code: string) => {
    const ast = parseCodeLow(code)
    Ast.removeIgnored(ast)
    Ast.addTemporaryFields(ast)
    return ast as Ast.Ast
}

export const parseFile = (fileName: string) => parseCode(fs.readFileSync(fileName, { encoding: 'utf-8' }))

export const generateCode = (ast: Ast.Ast) => generate(ast, { /* options */ }).code as string

export const generateFile = (ast: Ast.Ast, fileName: string) => {
    const msg =
        `//----------------------------------------------------------------------------------
// 
// This code was generated from material-ui ${Config.MUI_VERSION} by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

`
    const code = msg + generateCode(ast)
    const formated = Prettier.format(code, { parser: 'babylon' });
    fsExtra.outputFileSync(fileName, formated)
}

