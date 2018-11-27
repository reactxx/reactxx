import { TTyped } from 'reactxx-typings'
import { WidthStore } from './queryable/$widths/store'
import { $WidthsQuery } from './queryable/$widths/$width'
declare module 'reactxx-typings' {

    namespace TVariants {
        interface Platform {
            actWidth?: () => number
            addBreakpoint?: (width: number) => void
            _sheeter?: {
                widthsTimer?: number
                widthsStore?: WidthStore
                widthDirs?: Set<number>
            }
        }

        interface PropsCodePart<R extends TTyped.Shape = TTyped.Shape> extends $WidthsQuery { }

    }
}