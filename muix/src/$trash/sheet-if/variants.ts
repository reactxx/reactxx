import { TCommonStyles, TTyped, TSheeter, TComponents } from 'reactxx-typings'

export const enum Consts {
    name = '$IF'
}

declare module 'reactxx-typings' {

    namespace TVariants {


        type getSheetExtra<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['sheetExtra']

        interface ShapePart {
            sheetExtra?: TSheeter.EmptyInterface
        }

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: SheetWidthsPart<T, R>
        }

        type SheetIfPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            Record<string, TSheeter.RulesetOrAtomized<T, R>>

        type IFConditionPar<R extends TSheeter.Shape = TSheeter.Shape> = getSheetExtra<R> & {
            props: TComponents.PropsLow<R>
        }


    }
}
