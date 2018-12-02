import { WidthStore } from './queryable/$widths/store'
declare module 'reactxx-typings' {

    namespace TExtensions {
        interface Platform {
            actWidth?: () => number
            addBreakpoint?: (width: number) => void
            _sheeter?: {
                widthsTimer?: number
                widthsStore?: WidthStore
                widthDirs?: Set<number>
            }
        }

    }
}