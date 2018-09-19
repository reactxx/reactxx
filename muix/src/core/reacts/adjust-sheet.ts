import { TSheeter, TAtomize } from '../d-index'
import { adjustSheetCompiled } from 'reactxx-core/sheeter/atomize'

export const adjustSheet = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX<R>, classes: TSheeter.PartialSheet<R>) => {
    // adjust sheet compiled (in place)
    adjustSheetCompiled(sheet)
    // no classes => return sheet
    if (!classes) return sheet as TAtomize.Sheet<R>
    // adjust classes compiled (in place)
    adjustSheetCompiled(classes)
    // merge sheet with classes
    let res = { ...sheet as TAtomize.Sheet } as TAtomize.Sheet<R>
    for (const p in classes) {
        const rs = {...sheet[p]} as TAtomize.AtomizedRuleset
        rs.list = rs.list.concat(classes[p].list)
        res[p] = rs
    }
    return res
}