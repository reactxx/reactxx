import { TComponents, TSheeter, TVariants, TWithStyles } from 'reactxx-typings'
import { registerVariant, atomizeRulesetInner, mergeFlags, toClassNamesWithQueryEx, toClassNamesWithQuery } from 'reactxx-sheeter'

export const enum Consts {
    name = '$sheetFlags'
}

export const initVariant$sheetFlags = () => registerVariant({
    name: Consts.name,
    toVariantProc,
    testCondition
})

export const finishPropsCode: TWithStyles.FinishPropsCode = (codeProps, state) => {
    const { pipeStates } = state
    codeProps.toClassNames = toClassNamesForBind(mergeFlags(pipeStates.map(p => p.flags)), codeProps)
}

export type getSheetFlags<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['flags']

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: WhenFlagQuery<R>
        }
        type WhenFlagQuery<R extends TSheeter.Shape = TSheeter.Shape> = keyof getSheetFlags<R> extends never ? TSheeter.FakeInterface :
            Record<getSheetFlags<R>, boolean>

        interface ShapePart {
            flags?: TSheeter.EmptyInterface
        }

        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            sheetFlags?: WhenFlagQuery<R> // flags assigned in component code
        }

        interface PipeState {
            flags?: Record<string, true>
        }

    }
}

//*********************************************************
//  PRIVATE
//*********************************************************

const toClassNamesForBind = (pipeFlags: Record<string, true>, propsCode: TComponents.PropsCode) => {

    return (rulesets: TSheeter.RulesetItem[]) => {
        const {sheetFlags} = propsCode
        const sheetQuery: TVariants.Query = {
            $sheetFlags: pipeFlags && sheetFlags ? {...pipeFlags, ...sheetFlags} : sheetFlags ? sheetFlags : pipeFlags
        }
        return toClassNamesWithQuery(sheetQuery, propsCode.theme, rulesets)
    }

}

interface WhenFlagCondition extends TVariants.Condition {
    type: Consts.name
    flagName: string
}

const toVariantProc: TVariants.ToVariantProc<Record<string, TSheeter.RulesetOrAtomized>> = (list, whenFlag, path, pseudoPrefixes, conditions) => {
    for (const p in whenFlag) {
        const rules = whenFlag[p] as TSheeter.Ruleset
        if (Array.isArray(rules))
            rules.forEach((r, idx) =>
                atomizeRulesetInner(
                    list, r,
                    `${path}/$sheetFlags.${p}[${idx}]`,
                    pseudoPrefixes,
                    [...conditions, { type: Consts.name, flagName: p } as WhenFlagCondition],
                    wrapPseudoPrefixes(r, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, rules,
                `${path}/$sheetFlags.${p}`,
                pseudoPrefixes,
                [...conditions, { type: Consts.name, flagName: p } as WhenFlagCondition],
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


const testCondition = (cond: WhenFlagCondition, query: TVariants.Query) =>
    query.$sheetFlags && query.$sheetFlags[cond.flagName]

// const toClassNamesForBindEx = (pipeFlags: Record<string, true>, propsCode: TComponents.PropsCode) => {

//     return (rulesets: TSheeter.RulesetItem[]) => toClassNamesWithQueryEx(rulesetNames => {
//         const { sheetQuery, sheetQuery: { $sheetFlags } } = propsCode
//         const flags = $sheetFlags && pipeFlags ? { ...pipeFlags, ...$sheetFlags } : pipeFlags ? pipeFlags : $sheetFlags

//         sheetQuery.$sheetFlags = rulesetNames && flags ? { ...flags, ...rulesetNames } : rulesetNames ? rulesetNames : flags
//         return sheetQuery
//     }, propsCode.theme, rulesets)

// }

