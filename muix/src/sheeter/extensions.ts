import { TEngine, TComponents } from 'reactxx-typings'

/************************************TComponents******
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
declare module 'react' {
    interface HTMLAttributes<T> extends TComponents.ReactsCommonProperties {
    }
    interface SVGAttributes<T> extends TComponents.ReactsCommonProperties {
    }
}

/******************************************
  EXTEND REACT NATIVE
*******************************************/
declare module 'react-native' {
    interface ViewProperties extends TComponents.ReactsCommonProperties {
    }
    interface TextProperties extends TComponents.ReactsCommonProperties {
    }
    interface ImageProperties extends TComponents.ReactsCommonProperties {
    }
}

/******************************************
  EXTEND TYPINGS
*******************************************/
declare module 'reactxx-typings' {

    namespace TExtensions {

        interface Platform {
            createElement?: (type, props?, ...children) => any
            _withStyles?: {
                defaultTheme?
                $cache: { [componentId: number]: TEngine.Sheet }
                uniqueIdCounter?: number
                idCounter?: number
            }
        }


    }
}
