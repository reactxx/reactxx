import { TEngine} from 'reactxx-typings'

declare module 'reactxx-typings' {

    namespace TExtensions {

        interface Platform {
            _withStyles?: {
                defaultTheme?
                $cache: { [componentId: number]: TEngine.Sheet }
                uniqueIdCounter?: number
                idCounter?: number
            }
        }


    }
}
