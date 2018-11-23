import { TVariants, TSheeter } from 'reactxx-typings'

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Platform {
            _withStyles?: {
                defaultTheme?
                $cache: { [componentId: number]: TSheeter.Sheet }
                uniqueIdCounter?: number
                idCounter?: number
            }
        }


    }
}
