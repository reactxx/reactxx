import { TComponents, TSheeter, TVariants, TWithStyles } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetInner, mergeFlags, wrapPseudoPrefixes } from 'reactxx-sheeter'

export const enum Consts {
    name = '$sheetFlags'
}

export const sheetFlags_initVariant = () => registerVariantHandler({
    name: Consts.name,
    toAtomicRuleset,
    testAtomicRuleset
})

// export const finishPropsCode: TWithStyles.FinishPropsCode = (propsCode, state) => {
//     const { pipeStates } = state
//     propsCode.toClassNames = toClassNamesForBind(mergeFlags(pipeStates.map(p => p.flags)), propsCode)
// }

export const sheetFlags_finalizePropsCode1 = (state: TWithStyles.InstanceState) => {
    const { pipeStates } = state
    return mergeFlags(pipeStates.map(p => p.sheetFlags))
}

export const sheetFlags_finalizePropsCode2 = (pipeFlags: Record<string, boolean>, propsCode: TComponents.PropsCode) => {
    const { sheetFlags } = propsCode
    const sheetQuery: TVariants.Query = {
        $sheetFlags: pipeFlags && sheetFlags ? { ...pipeFlags, ...sheetFlags } : sheetFlags ? sheetFlags : pipeFlags
    }
    return sheetFlags
}


export type getSheetFlags<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['sheetFlags']
    //keyof R['sheetFlags'] extends never ? '``' : keyof R['sheetFlags']

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: WhenFlagQuery<R>
        }
        type WhenFlagQuery<R extends TSheeter.Shape = TSheeter.Shape> = keyof getSheetFlags<R> extends never ? TSheeter.FakeInterface :
            Record<getSheetFlags<R>, boolean>

        interface ShapePart {
            sheetFlags?: TSheeter.EmptyInterface
        }

        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            sheetFlags?: WhenFlagQuery<R> // flags assigned in component code
        }

        interface PipeState {
            sheetFlags?: Record<string, true>
        }

    }
}

//*********************************************************
//  PRIVATE
//*********************************************************

// const toClassNamesForBind = (pipeFlags: Record<string, true>, propsCode: TComponents.PropsCode) => {

//     return (rulesets: TSheeter.RulesetItem[]) => {
//         const { sheetFlags } = propsCode
//         const sheetQuery: TVariants.Query = {
//             $sheetFlags: pipeFlags && sheetFlags ? { ...pipeFlags, ...sheetFlags } : sheetFlags ? sheetFlags : pipeFlags
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


const testAtomicRuleset = (cond: WhenFlagCondition, query: TVariants.Query) =>
    query.$sheetFlags && query.$sheetFlags[cond.flagName]

