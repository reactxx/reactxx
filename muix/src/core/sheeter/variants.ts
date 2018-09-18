import { TSheeter, TVariants } from '../d-index'

import { toLinearAndAtomizedInner } from './to-linear-atomized'

export const toVariantPart = (ruleset: TVariants.VariantPart) => {
    // compile root addIns
    const { $whenUsed, $mediaq, $animation } = ruleset;

    const addIns = [
        { proc: toWhenUsedVariant, part: $whenUsed },
        { proc: toMediaQVariant, part: $mediaq },
        { proc: toAnimationVariant, part: $animation }
    ]

    return addIns.filter(p => p.part)
}

export const testConditions = (conditions: TVariants.Conditions, query: TVariants.Query) => {
    if (!conditions || conditions.length === 0) return true
    const firstFalse = conditions.find(cond => {
        switch (cond.type) {
            case 'whenUsed': return query.whenUsed && query.whenUsed[cond.rulesetName]
            case 'mediaq': return typeof query.mediaq === 'number' && cond.start <= query.mediaq && cond.end > query.mediaq
            case 'animation': return query.animation === (cond.opened ? 'opened' : 'closed')
        }
    })
    return !firstFalse
}

//*********************************************************
//  PRIVATE
//*********************************************************

const toWhenUsedVariant: TVariants.ToVariantProc = (list, ruleset: TVariants.WhenUsedPart, path, pseudoPrefixes, conditions) => {
    for (const p in ruleset) {
        const rules = ruleset[p] as TSheeter.Ruleset
        toLinearAndAtomizedInner(
            list, rules,
            `${path}/$whenUsed.${p}`,
            pseudoPrefixes,
            [...conditions, { type: 'whenUsed', rulesetName: p } as TVariants.WhenUsedCondition],
            wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}

const toMediaQVariant: TVariants.ToVariantProc = (list, ruleset: TVariants.MediaQPart, path, pseudoPrefixes, conditions) => {
}
const toAnimationVariant: TVariants.ToVariantProc = (list, ruleset: TVariants.AnimationPart, path, pseudoPrefixes, conditions) => {
}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

