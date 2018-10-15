import { TCommonStyles, TComponents, TSheeter, TVariants, TWithStyles } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetInner, wrapPseudoPrefixes } from 'reactxx-sheeter'

export const enum Consts {
    name = '$switch'
}

export const sheetSwitch_registerVariantHandler = () => {
    if (notRegistered = !notRegistered) return
    registerVariantHandler({
        name: Consts.name,
        toAtomicRuleset,
        testAtomicRuleset
    })
}
let notRegistered = true

export type getCases<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['cases']

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: SheetCases<R>
        }
        type SheetCases<R extends TSheeter.Shape = TSheeter.Shape> = keyof getCases<R> extends never ? TSheeter.FakeInterface :
            Record<getCases<R>, boolean>

        interface ShapePart {
            cases?: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds, R extends TSheeter.Shape> {
            [Consts.name]?: SheetSwitchPart<T, R>
        }
        type SheetSwitchPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            getCases<R> extends never ? never :
            PartialRecord<getCases<R>, TSheeter.RulesetOrAtomized<T, R>>


    }
}

//*********************************************************
//  PRIVATE
//*********************************************************

interface SheetSwitchCondition extends TVariants.Condition {
    type: Consts.name
    case: string
}

const toAtomicRuleset: TVariants.ToAtomicRuleset<Record<string, TSheeter.RulesetOrAtomized>> = (
    list, cases, path, pseudoPrefixes, conditions
) => {
    for (const p in cases) {
        const casep = cases[p] as TSheeter.Ruleset
        if (Array.isArray(casep))
            casep.forEach((ruleset, idx) =>
                atomizeRulesetInner(
                    list, ruleset,
                    `${path}/$switch.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, case: p } as SheetSwitchCondition],
                    wrapPseudoPrefixes(ruleset, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, casep,
                `${path}/$switch.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, case: p } as SheetSwitchCondition],
                wrapPseudoPrefixes(casep, pseudoPrefixes))
    }
}

const testAtomicRuleset = (cond: SheetSwitchCondition, query) =>
    query && query.$switch && query.$switch[cond.case]

