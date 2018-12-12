import { TEngine } from 'reactxx-typings'
import { WidthStore } from './queryable/$widths/store'

declare module 'reactxx-typings' {

    namespace TExtensions {
        interface Platform {
            actWidth?: () => number
            watchBreakpointChange?: (width: number) => void
            _styles?: {
                widthsTimer?: number
                widthsStore?: WidthStore
                breakpointSet?: Set<number>
                defaultTheme?
                $cache?: { [componentId: number]: TEngine.Sheet }
                instanceIdCounter?: number
                componentIdCounter?: number
            }
    }

    }
}