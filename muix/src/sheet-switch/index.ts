export * from './variants'
import { TComponents, TSheeter, TVariants, TAtomize } from 'reactxx-typings'
import { registerVariantHandler, adjustAtomized, isToAtomizeArray, resetPlatform, platform } from 'reactxx-sheeter'
import { Consts } from './variants'

export const initSwitch = (force?: boolean) => {
    if (force) resetPlatform()
    if (platform._switch) return
    platform._switch = true
    registerSwitchHandler()
}

const registerSwitchHandler = () => registerVariantHandler({
    name: Consts.name,
    toAtomicRuleset,
    testAtomicRuleset
})

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
        if (isToAtomizeArray(casep))
            casep.forEach((ruleset, idx) =>
                adjustAtomized(
                    list,
                    ruleset,
                    `${path}/$switch.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, case: p } as SwitchCondition]
                )
            )
        else
            adjustAtomized(
                list,
                casep as TAtomize.Source,
                `${path}/$switch.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, case: p } as SwitchCondition])
    }
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: SwitchCondition, state) => {
    const { propsCode: { sheetQuery } } = state
    return sheetQuery && sheetQuery.$switch && sheetQuery.$switch[cond.case]
}
