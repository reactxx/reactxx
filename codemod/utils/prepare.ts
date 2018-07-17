import * as warning from 'warning'
import * as Ast from './ast'
import * as Parser from './parser'
import * as Config from './config'
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

export const commentStart = '*** REACTXX PATCH: '

const getNode_comments = (root: Ast.Ast) => Ast.astq.query(root,
    `// CommentBlock [ substr(@value,0,${commentStart.length})=='${commentStart}' ]`
) as Ast.Ast[]

const prepareAstDumpLow = (_root: Ast.Ast, path: string) => {
    if (!path) return null
    let root: any = _root
    const parts = path.split('/')
    Ast.removeTemporaryFields(root)
    parts.forEach((part, idx) => {
        if (part.charAt(0) !== '#')
            root = root[part]
        else {
            const actIdx = parseInt(part.substr(1));
            (root as Array<any>).splice(actIdx + 1);
            (root as Array<any>).splice(0, actIdx);
            root = root[0]
        }
    })
}

export const prepareAstDump = (name: string, srcPath: string = Config.patchSource, destPath: string = Config.tempDump) => {
    const root = Parser.parseFile(srcPath + name + '.js')
    const comments = getNode_comments(root)
    if (!comments || comments.length===0) return
    fsExtra.emptyDirSync(destPath)
    comments.forEach(comment => {
        const rootCopy = JSON.parse(JSON.stringify(root))
        const name = (comment.value as string).substr(commentStart.length)
        prepareAstDumpLow(rootCopy, comment.$path)
        fsExtra.outputFileSync (destPath + name + '.json', JSON.stringify(rootCopy, null, 2))
    })
}