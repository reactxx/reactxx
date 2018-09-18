import { TSheeter, TCompiler } from '../d-index'
import { adjustSheetCompiled } from '../sheeter/to-linear-atomized'

export const adjustSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX<R>, classes: TSheeter.PartialSheet<R>) => {
    // adjust sheet compiled (in place)
    adjustSheetCompiled(sheet)
    // no classes => return sheet
    if (!classes) return sheet as TCompiler.Sheet<R>
    // adjust classes compiled (in place)
    adjustSheetCompiled(classes)
    // merge sheet with classes
    let res = { ...sheet as TCompiler.Sheet } as TCompiler.Sheet<R>
    for (const p in classes) {
        const rs = {...sheet[p]} as TCompiler.LinearAndAtomized
        rs.list = rs.list.concat(classes[p].list)
        res[p] = rs
    }
    return res
}