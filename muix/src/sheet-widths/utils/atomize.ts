import { TComponents, TVariants, TAtomize, TSheeter } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetLow, isAtomicArray } from 'reactxx-sheeter'
import { Consts } from '../variants'
import { intervalToSelector, parse, test } from './parser'

// platform dependent import
import { actWidth } from 'reactxx-sheet-widths'

export const sheetWidths_registerVariantHandler = () => {
    if (notRegistered = !notRegistered) return
    registerVariantHandler({
        name: Consts.name,
        toAtomicRuleset,
        testAtomicRuleset
    })
}
let notRegistered = true

//*********************************************************
//  PRIVATE
//*********************************************************

interface WidthsCondition extends TVariants.Condition {
    type: Consts.name
    interval: [number, number]
}

const toAtomicRuleset: TVariants.ToAtomicRuleset<TVariants.SheetWidthsPart> = (
    list, widths, path, _pseudoPrefixes, _conditions
) => {
    if (!widths) return
    const pseudoPrefixes = (widthName: string) => window.isWeb
        ? [..._pseudoPrefixes, intervalToSelector(widthName)]
        : _pseudoPrefixes
    const conditions = (widthName: string) =>
        window.isWeb
            ? _conditions
            : [..._conditions, { type: Consts.name, interval: parse(widthName) } as WidthsCondition]
    for (const widthName in widths) {
        const casep = widths[widthName]
        if (!casep) continue
        if (Array.isArray(casep) && !isAtomicArray(casep))
            casep.forEach((ruleset, idx) =>
                atomizeRulesetLow(
                    ruleset, list,
                    `${path}/$switch.${widthName}[${idx}]`,
                    pseudoPrefixes(widthName),
                    conditions(widthName))
            )
        else
            atomizeRulesetLow(
                casep,
                list,
                `${path}/$widths.${widthName}`,
                pseudoPrefixes(widthName),
                conditions(widthName))
    }
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: WidthsCondition, state) =>
    test(cond.interval, actWidth())

