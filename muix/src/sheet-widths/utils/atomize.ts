import { TComponents, TVariants, TAtomize, TSheeter } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetLow, isAtomicArray } from 'reactxx-sheeter'
import { Consts } from '../variants'
import { intervalToSelector } from './parser'

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
    widthName: string
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
            : [..._conditions, { type: Consts.name, widthName } as WidthsCondition]
    for (const widthName in widths) {
        const casep = widths[widthName]
        if (!casep) continue
        if (Array.isArray(casep) && !isAtomicArray(casep))
            casep.forEach((ruleset, idx) =>
                atomizeRulesetLow(
                    ruleset as any, list, 
                    `${path}/$switch.${widthName}[${idx}]`,
                    pseudoPrefixes(widthName),
                    conditions(widthName))
            )
        else
            atomizeRulesetLow(
                casep as any, // as TVariants.VariantPart,
                list, 
                `${path}/$widths.${widthName}`,
                pseudoPrefixes(widthName),
                conditions(widthName))
    }
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: WidthsCondition, state) => {
    const { propsCode: { isWidth } } = state
    return isWidth && isWidth[cond.widthName]
}

