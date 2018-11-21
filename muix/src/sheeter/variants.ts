import { TVariants, TComponents } from 'reactxx-typings'

export interface IVariantHandler {
    name: string,
    toAtomicRuleset: TVariants.ToAtomicRuleset<any>,
    testAtomicRuleset: TComponents.TestAtomicRuleset
}

declare module 'reactxx-typings' {

    namespace TVariants {
        interface Platform {
            _sheeter?: true
                // variantHandlers?: IVariantHandler[]
                // variantHandlersDir?: Record<string, IVariantHandler>
        }
    }
}