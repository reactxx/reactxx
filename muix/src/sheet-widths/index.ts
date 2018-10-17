export * from './pipe'

import { TCommonStyles, TSheeter, TVariants } from 'reactxx-typings'
import { registerVariantHandler, atomizeRulesetInner, wrapPseudoPrefixes } from 'reactxx-sheeter'

export const enum Consts {
    name = '$widths'
}

export const sheetWidths_registerVariantHandler = () => {
    if (notRegistered = !notRegistered) return
    registerVariantHandler({
        name: Consts.name,
        toAtomicRuleset,
        testAtomicRuleset
    })
}
let notRegistered = true

declare module 'reactxx-typings' {

    namespace TVariants {

        type getWidths<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['widths']

        interface Query<R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: PropsBreakpoints<R, boolean>
        }

        interface ShapePart {
            widths?: TSheeter.EmptyInterface
        }
        interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> {
            sheetWidths?: PropsBreakpoints<R, string>
        }
        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            sheetWidths?: PropsBreakpoints<R, boolean>
        }

        interface ComponentOptions {
            withSheetWidthsProp?: boolean // PropsCodePart contains sheetWidths prop (WEB then needs to listen to width change)
        }

        // interface CodeHooks<R extends TSheeter.Shape> {
        //     onWidthChanged?: (oldBreak: getBreakpoints<R>, newBreak: getBreakpoints<R>) => void
        // }

        type PropsBreakpoints<R extends TSheeter.Shape, T> = keyof getWidths<R> extends never ? TSheeter.FakeInterface :
            Record<getWidths<R>, T>

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: SheetWidthsPart<T, R>
        }
        type SheetWidthsPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            getWidths<R> extends never ? never :
            PartialRecord<getWidths<R>, TSheeter.RulesetOrAtomized<T, R>>


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
    list, widths, path, _pseudoPrefixes, _conditions
) => {
    const pseudoPrefixes = window.isWeb ? [..._pseudoPrefixes] : _pseudoPrefixes
    const conditions = (p: string) =>
        window.isWeb ? _conditions : [..._conditions, { type: Consts.name, case: p } as SheetSwitchCondition]
    for (const p in widths) {
        const casep = widths[p] as TSheeter.Ruleset
        if (Array.isArray(casep))
            casep.forEach((ruleset, idx) =>
                atomizeRulesetInner(
                    list, ruleset,
                    `${path}/$switch.${p}[${idx}]`,
                    pseudoPrefixes,
                    conditions(p),
                    wrapPseudoPrefixes(ruleset, pseudoPrefixes))
            )
        else
            atomizeRulesetInner(
                list, casep,
                `${path}/$switch.${p}`,
                pseudoPrefixes,
                conditions(p),
                wrapPseudoPrefixes(casep, pseudoPrefixes))
    }
}

const testAtomicRuleset = (cond: SheetSwitchCondition, query) =>
    query && query.$switch && query.$switch[cond.case]
