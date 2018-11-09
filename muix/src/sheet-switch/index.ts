export * from './variants'
import { TComponents, TSheeter, TVariants, TAtomize } from 'reactxx-typings'
import { registerVariantHandler, adjustAtomizedLow, isToAtomizeArray, resetPlatform, platform } from 'reactxx-sheeter'
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
                adjustAtomizedLow(
                    list,
                    ruleset,
                    `${path}/$switch.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, wrapCondition({ type: Consts.name, case: p })]
                )
            )
        else
            adjustAtomizedLow(
                list,
                casep as TAtomize.Source,
                `${path}/$switch.${p}`,
                pseudoPrefixes,
                [...conditions, wrapCondition({ type: Consts.name, case: p })])
    }
}

export const wrapCondition = (cond: SwitchCondition) => {
    if (window.__TRACE__)
        cond['toJSON'] = toJSON.bind(cond)
    return cond
}

function toJSON() {
    const c = this as SwitchCondition
    return `IF ${c.type}: ${c.case}`
}


const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: SwitchCondition, state) => {
    const { propsCode: { sheetQuery } } = state
    return sheetQuery && sheetQuery.$switch && sheetQuery.$switch[cond.case]
}
