export * from './variants'
import { TComponents, TSheeter, TVariants, TAtomize } from 'reactxx-typings'
import { registerVariantHandler, adjustAtomizedLow, isToAtomizeArray, resetPlatform, platform } from 'reactxx-sheeter'
import { Consts } from './variants'

export const initIF = (force?: boolean) => {
    if (force) resetPlatform()
    registerIFHandler()
}

export const $C = (fnc: (v: TVariants.IFConditionPar) => boolean) => {
    fncDir[++fncCounter] = fnc
    return fncCounter.toString()
}
let fncCounter = 0
const fncDir: Array<(v) => boolean> = []

const registerIFHandler = () => registerVariantHandler({
    name: Consts.name,
    toAtomicRuleset,
    testAtomicRuleset
})

//*********************************************************
//  PRIVATE
//*********************************************************
interface IFCondition extends TVariants.Condition {
    type: Consts.name
    conditionId: string
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
                    `${path}/$IF.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, wrapCondition({ type: Consts.name, conditionId: p })]
                )
            )
        else
            adjustAtomizedLow(
                list,
                casep as TAtomize.Source,
                `${path}/$IF.${p}`,
                pseudoPrefixes,
                [...conditions, wrapCondition({ type: Consts.name, conditionId: p })])
    }
}

const wrapCondition = (cond: IFCondition) => {
    if (window.__TRACE__)
        cond['toJSON'] = toJSON.bind(cond)
    return cond
}

function toJSON() {
    const c = this as IFCondition
    return `${c.type}: ${c.conditionId}`
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: IFCondition, state) => {
    const par = {
        propsCode: state.propsCode
    }
    const { propsCode: { sheetQuery } } = state
    return fncDir[cond.conditionId](par)
}
