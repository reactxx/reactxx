export * from './variants'
import { TComponents, TSheeter, TVariants } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetLow, wrapPseudoPrefixes, isAtomicArray } from 'reactxx-sheeter'
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
                atomizeRulesetLow(
                    ruleset,
                    list,
                    `${path}/$switch.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, case: p } as SwitchCondition]
                )
            )
        else
            atomizeRulesetLow(
                casep,
                list,
                `${path}/$switch.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, case: p } as SwitchCondition])
    }
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: SwitchCondition, state) => {
    const { propsCode: { sheetQuery } } = state
    return sheetQuery && sheetQuery.$switch && sheetQuery.$switch[cond.case]
}
