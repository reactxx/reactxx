import { TSheeter, TVariants, TCommonStyles } from 'reactxx-typings'
import { registerVariant } from 'reactxx-core/sheeter/variants'
import { atomizeRulesetInner } from 'reactxx-core/sheeter/atomize-low'

export const initVariant$whenFlag = () => registerVariant({
    name: Consts.name,
    toVariantProc,
    testCondition
})

//*********************************************************
//  PRIVATE
//*********************************************************

const enum Consts {
    name = '$whenFlag'
}

declare module 'reactxx-typings' {

    namespace TVariants {

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: WhenFlagPart<T, R>
        }
        type WhenFlagPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            TSheeter.getFlags<R> extends never ? TSheeter.FakeInterface : {
                [P in TSheeter.getFlags<R>]?: TSheeter.RulesetOrAtomized<T, R>
            }


        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: WhenFlagQuery<R>
        }
        type WhenFlagQuery<R extends TSheeter.Shape = TSheeter.Shape> = keyof TSheeter.getFlags<R> extends never ? TSheeter.FakeInterface :
            PartialRecord<TSheeter.getFlags<R>, boolean>

        interface WhenFlagCondition extends Condition {
            type: Consts.name
            rulesetName: string
        }

    }
}

const toVariantProc: TVariants.ToVariantProc<TVariants.WhenFlagPart> = (list, whenFlag, path, pseudoPrefixes, conditions) => {
    for (const p in whenFlag) {
        const rules = whenFlag[p] as TSheeter.Ruleset
        if (Array.isArray(rules))
            rules.forEach((r, idx) =>
                atomizeRulesetInner(
                    list, r,
                    `${path}/$whenFlag.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, rulesetName: p } as TVariants.WhenFlagCondition],
                    wrapPseudoPrefixes(r, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, rules,
                `${path}/$whenFlag.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, rulesetName: p } as TVariants.WhenFlagCondition],
                wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}

const wrapPseudoPrefixes = (rules: {}, pseudoPrefixes: string[]) => {
    if (pseudoPrefixes.length === 0) return rules
    let res = rules
    for (let i = pseudoPrefixes.length - 1; i >= 0; i--)
        res = { [pseudoPrefixes[i]]: res }
    return res
}


const testCondition = (cond: TVariants.WhenFlagCondition, query: TVariants.Query) => {
    return query.$whenFlag && query.$whenFlag[cond.rulesetName]
}
