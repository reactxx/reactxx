import { TComponents, TUseSheeter } from 'reactxx-use-sheeter'
import { TPrimitives } from './shapes'

declare module 'reactxx-typings' {

    namespace TExtensions {

        interface Platform {
            View?: TComponents.SFC<TPrimitives.ViewShape>
            Text?: TComponents.SFC<TPrimitives.TextShape>
            Icon?: TComponents.SFC<TPrimitives.IconShape>
            ScrollView?: TComponents.SFC<TPrimitives.ScrollViewShape>
            AnimatedView?: TComponents.SFC<TPrimitives.ViewShape>
            AnimatedText?: TComponents.SFC<TPrimitives.TextShape>
            AnimatedIcon?: TComponents.SFC<TPrimitives.IconShape>

            viewCreator?: TUseSheeter.ComponentCreator<TPrimitives.ViewShape>
            textCreator?: TUseSheeter.ComponentCreator<TPrimitives.TextShape>
            iconCreator?: TUseSheeter.ComponentCreator<TPrimitives.IconShape>
            scrollViewCreator?: TUseSheeter.ComponentCreator<TPrimitives.ScrollViewShape>
            animatedViewCreator?: TUseSheeter.ComponentCreator<TPrimitives.ViewShape>
            animatedTextCreator?: TUseSheeter.ComponentCreator<TPrimitives.TextShape>
            animatedIconCreator?: TUseSheeter.ComponentCreator<TPrimitives.IconShape>

            getView?: TUseSheeter.GetComponent<TPrimitives.ViewShape>
            getText?: TUseSheeter.GetComponent<TPrimitives.TextShape>
            getIcon?: TUseSheeter.GetComponent<TPrimitives.IconShape>
            getScrollView?: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape>
            getAnimatedView?: TUseSheeter.GetComponent<TPrimitives.ViewShape>
            getAnimatedText?: TUseSheeter.GetComponent<TPrimitives.TextShape>
            getAnimatedIcon?: TUseSheeter.GetComponent<TPrimitives.IconShape>

        }
    }
}
