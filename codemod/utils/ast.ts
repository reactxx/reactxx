import * as ASTQ from 'astq'

export const astq = () => {
    const res = new ASTQ()
    res.func("isHTMLTag", (adapter, node, tagName, tagNames) => {
        if (typeof tagName !== 'string') return false
        const first = tagName[0].charAt(0)
        if (first === first.toLowerCase()) return true
        if (!Array.isArray(tagNames)) return false
        return !!tagNames.find(name => name === tagName)
    })
    return res
}

export interface MUISourceInfo {
    dir?: string
    name?: string
    path?: string
    withStyles?: boolean
    withTheme?: boolean
    destPath?: string
    origPath?: string
    //origExists?: boolean
    adjustThemeProperties?: string[]
    adjustThemeMethods?: string[]
    renderFunc?: Ast
    isClass?: boolean
    nameIsUppercase?: boolean
    dirIsUppercase?: boolean
    defaultPropsStr?: string
}
export interface FileDescr {
    path?: string
    transform?: (root: Ast, info: MUISourceInfo) => Ast
    //transformStr?: (code: string) => string
}

export type Ast = {
    $path: string
    $qpath: string,
    $parentPath: string
    $deep: number
} & { [prop: string]: any }

const ignores = {
    start: true,
    end: true,
    loc: true,
    sourceType: true,
    interpreter: true,
    directives: true,
    comments: true,
}

export function removeUnused(root: Ast) {
    removeIgnored(root)
    removeTemporaryFields(root)
    return root
}

export function removeIgnored(root: Ast) {
    for (const p in root) {
        const value = root[p]
        if (!ignores[p]) {
            if (value && typeof value === 'object') removeIgnored(value)
        } else
            delete root[p]
    }
    return root
}

export const addTemporaryFields = (root: Ast, parent?: Ast, nodeParent?: Ast, prop?: string, deep: number = 0) => {
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
        addTemporaryFields(value, root, nodeParent, isArray ? `#${p}` : p, deep)
    }
}

export const findNodeFromPath = (root: Ast, path: string) => {
    if (!path) return null
    path.split('/').forEach(part => {
        if (part.charAt(0) === '#') root = root[parseInt(part.substr(1))]
        else root = root[part]
    })
    return root
}

export const removeTemporaryFields = (root: Ast) => {
    for (const p in root) {
        if (p.charAt(0) === '$') delete root[p]
        const sub = root[p]
        if (sub && typeof sub === 'object') removeTemporaryFields(sub)
    }
}

export const removeNode = (_root: Ast | any, path: string) => {
    if (!path) return null
    let root: any = _root
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

