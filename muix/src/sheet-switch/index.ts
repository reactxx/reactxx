export * from './variants'
import { TComponents, TSheeter, TVariants } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetInner, wrapPseudoPrefixes, isAtomicArray } from 'reactxx-sheeter'
import { Consts } from './variants'

export const sheetSwitch_registerVariantHandler = () => {
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
interface SwitchCondition extends TVariants.Condition {
    type: Consts.name
    case: string
}

const toAtomicRuleset: TVariants.ToAtomicRuleset<Record<string, TSheeter.RulesetOrAtomized>> = (
    list, cases, path, pseudoPrefixes, conditions
) => {
    for (const p in cases) {
        const casep = cases[p]
        if (Array.isArray(casep) && !isAtomicArray(casep))
            casep.forEach((ruleset, idx) =>
                atomizeRulesetInner(
                    list, ruleset as any,
                    `${path}/$switch.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, case: p } as SwitchCondition],
                    wrapPseudoPrefixes(ruleset, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, casep as any,
                `${path}/$switch.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, case: p } as SwitchCondition],
                wrapPseudoPrefixes(casep, pseudoPrefixes))
    }
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: SwitchCondition, state) => {
    const { propsCode: { mergedInnerState } } = state
    return mergedInnerState && mergedInnerState.$switch && mergedInnerState.$switch[cond.case]
}
