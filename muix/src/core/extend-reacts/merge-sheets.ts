import { TSheeter, TCompiler } from '../typings/index'
import { adjustSheetCompiled } from '../compiler/ruleset'

export const mergeSheets = <R extends TSheeter.Shape = TSheeter.Shape>(sheet: TSheeter.SheetX<R>, classes: TSheeter.PartialSheet<R>) => {
    // adjust sheet compiled
    adjustSheetCompiled(sheet)
    // no classes => return sheet
    if (!classes) return sheet
    // adjust classes compiled
    adjustSheetCompiled(classes)
    // merge sheet with classes
    let res: TCompiler.Sheet<R> = { ...sheet as any }
    for (const p in classes)
        res[p] = (res[p] as TCompiler.Ruleset).list.concat(classes[p].list)
    return res
}