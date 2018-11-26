import { TAtomize} from 'reactxx-typings'

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Platform {
            _withStyles?: {
                defaultTheme?
                $cache: { [componentId: number]: TAtomize.Sheet }
                uniqueIdCounter?: number
                idCounter?: number
            }
        }


    }
}
