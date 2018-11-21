import { WidthStore } from './conditions/$widths/store'
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