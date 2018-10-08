import { TComponents, TSheeter, TVariants, TWithStyles } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetInner, mergeFlags, wrapPseudoPrefixes } from 'reactxx-sheeter'

export const enum Consts {
    name = '$sheetSwitch'
}

export const sheetSwitch_registerVariantHandler = () => registerVariantHandler({
    name: Consts.name,
    toAtomicRuleset,
    testAtomicRuleset
})

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

        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            sheetQuery?: Query<R> // flags assigned in component code
        }

        // interface PipeState {
        //     sheetSwitch?: Record<string, true>
        // }

    }
}

//*********************************************************
//  PRIVATE
//*********************************************************

// const toClassNamesForBind = (pipeFlags: Record<string, true>, propsCode: TComponents.PropsCode) => {

//     return (rulesets: TSheeter.RulesetItem[]) => {
//         const { sheetSwitch } = propsCode
//         const sheetQuery: TVariants.Query = {
//             $sheetSwitch: pipeFlags && sheetSwitch ? { ...pipeFlags, ...sheetSwitch } : sheetSwitch ? sheetSwitch : pipeFlags
//         }
//         return toClassNamesWithQuery(sheetQuery, propsCode.theme, rulesets)
//     }

// }

interface WhenFlagCondition extends TVariants.Condition {
    type: Consts.name
    flagName: string
}

const toAtomicRuleset: TVariants.ToAtomicRuleset<Record<string, TSheeter.RulesetOrAtomized>> = (list, whenFlag, path, pseudoPrefixes, conditions) => {
    for (const p in whenFlag) {
        const rules = whenFlag[p] as TSheeter.Ruleset
        if (Array.isArray(rules))
            rules.forEach((r, idx) =>
                atomizeRulesetInner(
                    list, r,
                    `${path}/$sheetSwitch.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, flagName: p } as WhenFlagCondition],
                    wrapPseudoPrefixes(r, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, rules,
                `${path}/$sheetSwitch.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, flagName: p } as WhenFlagCondition],
                wrapPseudoPrefixes(rules, pseudoPrefixes))
    }
}

const testAtomicRuleset = (cond: WhenFlagCondition, query) =>
    query.$sheetSwitch && query.$sheetSwitch[cond.flagName]

