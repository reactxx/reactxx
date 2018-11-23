import { TSheeter } from 'reactxx-typings'
import { WidthStore } from './conditions/$widths/store'
import { $WidthsQuery } from './conditions/$widths/$width'
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

        interface PropsCodePart<R extends TSheeter.Shape = TSheeter.Shape> extends $WidthsQuery { }

    }
}