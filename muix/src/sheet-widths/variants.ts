import { TCommonStyles, TSheeter } from 'reactxx-typings'

export const enum Consts {
    name = '$widths'
}

declare module 'reactxx-typings' {

    namespace TVariants {

        type getWidths<R extends TSheeter.Shape = TSheeter.Shape> = keyof R['widths']

        interface ShapePart {
            widths?: TSheeter.EmptyInterface
        }
        interface PropsPart<R extends TSheeter.Shape = TSheeter.Shape> {
            widths?: PropsBreakpoints<R, string>
        }
        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> {
            isWidths?: PropsBreakpoints<R, boolean>
        }

        interface ComponentOptions {
            withWidthsRuleset?: boolean // PropsCodePart contains sheetWidths prop (WEB then needs to listen to width change)
        }

        type PropsBreakpoints<R extends TSheeter.Shape, T> = keyof getWidths<R> extends never ? TSheeter.FakeInterface :
            Record<getWidths<R>, T>

        interface VariantPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> {
            [Consts.name]?: SheetWidthsPart<T, R>
        }

        type SheetWidthsPart<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends TSheeter.Shape = TSheeter.Shape> =
            Record<string, TSheeter.RulesetOrAtomized<T, R>>
    }


}
