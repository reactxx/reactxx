import { TEngine, $V, $T, $I, $W } from 'reactxx-typings'
import { TComponents } from './typings/components'
import { TextProperties, ViewStyle } from 'react-native'


/************************************TComponents******
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
// declare module 'react' {
//     interface HTMLAttributes<T> extends TComponents.ReactsCommonProperties<$W> {
//     }
//     interface SVGAttributes<T> extends TComponents.ReactsCommonProperties<$W> {
//     }
// }

// /******************************************
//   EXTEND REACT NATIVE
// *******************************************/
// declare module 'react-native' {
//     interface ViewProperties extends TComponents.ReactsCommonProperties<$V> {
//     }
//     interface TextProperties extends TComponents.ReactsCommonProperties<$T> {
//     }
//     interface ImageProperties extends TComponents.ReactsCommonProperties<$I> {
//     }
// }

// /******************************************
//   EXTEND 
// *******************************************/
// declare module '@expo/vector-icons' {
//     interface BaseIconProps extends TComponents.ReactsCommonProperties<$T>, TextProperties {
//     }
// }

/******************************************
  EXTEND TYPINGS
*******************************************/
declare module 'reactxx-typings' {

    namespace TExtensions {

        interface Platform {
            //createElement?: (type, props?, ...children) => any
            _useSheeter?: {
                defaultTheme?
                $cache: { [componentId: number]: TEngine.Sheet }
                uniqueIdCounter?: number
                idCounter?: number
            }
        }


    }
}
