import { TCompiler, TSheeter, TRulesetConditions } from '../typings'

import { compileTree } from './ruleset'

export const compileConditionals = (ruleset: TRulesetConditions.RulesetConditionPart) => {
    // compile root addIns
    const { $whenUsed, $mediaq, $animation, $conditional } = ruleset;

    const addIns = [
        { proc: compileConditional, part: $conditional },
        { proc: compileWhenUsed, part: $whenUsed },
        { proc: compileMediaQ, part: $mediaq },
        { proc: compileAnimation, part: $animation }
    ]

    return addIns.filter(p => p.part)
}

export const testConditions = (conditions: TRulesetConditions.Conditions, query: TRulesetConditions.Query) => {
    if (!conditions || conditions.length === 0) return true
    const firstFalse = conditions.find(cond => {
        switch (cond.type) {
            case 'whenUsed': return query.whenUsed && query.whenUsed[cond.rulesetName]
            case 'mediaq': return typeof query.mediaq === 'number' && cond.start <= query.mediaq && cond.end > query.mediaq
            case 'animation': return query.animation === (cond.opened ? 'opened' : 'closed')
            case 'conditional':
                const q = query.conditionalQuery
                return cond.condition(q.props, q.theme, q.state)
        }
    })
    return !firstFalse
}



//*********************************************************
//  PRIVATE
//*********************************************************

const compileWhenUsed: TRulesetConditions.CompileProc = (list, ruleset: TRulesetConditions.WhenUsedPart, path, pseudoPrefixes, conditions) => {
    for (const p in ruleset) {
        const rules = ruleset[p] as TSheeter.RulesetInner
        compileTree(
            list, rules,
            `${path}/$whenUsed.${p}`,
            pseudoPrefixes,
            [...conditions, { type: 'whenUsed', rulesetName: p } as TRulesetConditions.WhenUsedCondition],
            wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}
const compileConditional: TRulesetConditions.CompileProc = (list, ruleset: TRulesetConditions.ConditionalPart, path, pseudoPrefixes, conditions) => {
    ruleset.forEach((rules, idx) => {
        compileTree(
            list, rules,
            `${path}/$conditional.${idx}`,
            pseudoPrefixes,
            [...conditions, { type: 'conditional', condition: rules.$condition } as TRulesetConditions.ConditionalCondition],
            wrapPseudoPrefixes(rules, pseudoPrefixes))
    })
}

const compileMediaQ: TRulesetConditions.CompileProc = (list, ruleset: TRulesetConditions.MediaQPart, path, pseudoPrefixes, conditions) => {
}
const compileAnimation: TRulesetConditions.CompileProc = (list, ruleset: TRulesetConditions.AnimationPart, path, pseudoPrefixes, conditions) => {
}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}

