import { TVariants, TComponents } from 'reactxx-typings'
import { WidthStore } from './conditions/$widths/store'
export interface IVariantHandler {
    name: string,
    toAtomicRuleset: TVariants.ToAtomicRuleset<any>,
    testAtomicRuleset: TComponents.TestAtomicRuleset
}

declare module 'reactxx-typings' {

    namespace TVariants {
        interface Platform {
            actWidth?: () => number
            addBreakpoint?: (width: number) => void
            _sheeter?: {
                widthsTimer?: number
                widthsStore?: WidthStore
                widthDir?: Set<number>
            }
        }
    }
}