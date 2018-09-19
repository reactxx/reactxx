import { TSheeter, TVariants } from '../d-index'

import { atomizeRulesetInner } from 'reactxx-core/sheeter/atomize'

export const toVariantParts = (ruleset: TVariants.VariantPart) => {
    // compile root addIns
    const { $whenFlag, $mediaq, $animation } = ruleset;

    const addIns = [
        { proc: toWhenFlagVariant, part: $whenFlag },
        { proc: toMediaQVariant, part: $mediaq },
        { proc: toAnimationVariant, part: $animation }
    ]

    return addIns.filter(p => p.part)
}

export const testConditions = (conditions: TVariants.Conditions, query: TVariants.Query) => {
    if (!conditions || conditions.length === 0) return true
    const firstFalse = conditions.find(cond => {
        switch (cond.type) {
            case 'whenFlag': return query.whenFlag && query.whenFlag[cond.rulesetName]
            case 'mediaq': return typeof query.mediaq === 'number' && cond.start <= query.mediaq && cond.end > query.mediaq
            case 'animation': return query.animation === (cond.opened ? 'opened' : 'closed')
        }
    })
    return !firstFalse
}

//*********************************************************
//  PRIVATE
//*********************************************************

const toWhenFlagVariant: TVariants.ToVariantProc = (list, ruleset: TVariants.WhenFlagPart, path, pseudoPrefixes, conditions) => {
    for (const p in ruleset) {
        const rules = ruleset[p] as TSheeter.Ruleset
        if (Array.isArray(rules))
            rules.forEach((r, idx) =>
                atomizeRulesetInner(
                    list, r,
                    `${path}/$whenFlag.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: 'whenFlag', rulesetName: p } as TVariants.WhenFlagCondition],
                    wrapPseudoPrefixes(r, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, rules,
                `${path}/$whenFlag.${p}`,
                pseudoPrefixes,
                [...conditions, { type: 'whenFlag', rulesetName: p } as TVariants.WhenFlagCondition],
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

