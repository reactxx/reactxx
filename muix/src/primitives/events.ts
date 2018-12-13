import { TComponents } from 'reactxx-typings'
import { TPrimitives } from './shapes'

/******************************************
  EVENTS
*******************************************/
export namespace TEvents {
    //type TEventOnPress = 'onPress'
    export type TEventsSimple = 'onPress' | 'onLongPress'
    export type TEventsAll = TEventsSimple | 'onPressIn' | 'onPressOut'

    export type Events<R extends string> = PartialRecord<R, () => void>

    export interface EventsWeb {
        onClick?: React.MouseEventHandler<Element>
        onMouseDown?: React.MouseEventHandler<Element>
        onMouseUp?: React.MouseEventHandler<Element>
    }

    //interface NativeEventPar<R extends Shape = Shape> extends ReactN.GestureResponderEvent { current?: PropsCode<R> }
    export interface EventsNativeText {
        onPress?: () => void
        onLongPress?: () => void
    }

    export interface EventsNativeView extends EventsNativeText {
        onPressIn?: () => void
        onPressOut?: () => void
    }
}

export const getWebEvents = (props: TComponents.Props<TPrimitives.TextShape>, url?: string) => {
    return [true, {}] as [boolean, TEvents.EventsWeb]
}

export const getViewEvents = (props: TComponents.Props<TPrimitives.ViewShape>, url: string) => {
    return [true, {}] as [boolean, TEvents.EventsNativeView]
}

export const getTextEvents = (props: TComponents.Props<TPrimitives.TextShape>, url: string) => {
    return [true, {}] as [boolean, TEvents.EventsNativeText]

    // let onPress = events.onPress
    // const doPress = !url ? onPress : () => Linking.canOpenURL(url).then(supported => {
    //     warning(supported, `Can't handle url: ${url}`)
    //     return Linking.openURL(url);
    // }).catch(err => warning(false, `An error occurred: ${err}, ${url}`))

}

