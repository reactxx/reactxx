import { TVariants, TSheeter } from 'reactxx-typings'

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Platform {
            _withStyles?: {
                namedThemes?: { [themeName: string]: any }
                $cache: { [componentId: number]: TSheeter.Sheet }
            }
        }


    }
}
