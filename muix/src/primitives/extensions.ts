import { TComponents, TTyped } from 'reactxx-typings'
import { TPrimitives } from './shapes'

import {DomPopmotionConfig} from 'popmotion-pose' 

declare module 'reactxx-typings' {

    namespace TExtensions {

        interface Shape { 
            sheet?: Record<string, TTyped.RulesetIds>
        }

        interface Config { 
            defaultPose?: DomPopmotionConfig
        }

        interface Platform {
            View?: TComponents.SFC<TPrimitives.ViewShape>
            Text?: TComponents.SFC<TPrimitives.TextShape>
            Icon?: TComponents.SFC<TPrimitives.IconShape>
            ScrollView?: TComponents.SFC<TPrimitives.ScrollViewShape>
            AnimatedView?: TComponents.SFC<TPrimitives.ViewShape>
            AnimatedText?: TComponents.SFC<TPrimitives.TextShape>
            AnimatedIcon?: TComponents.SFC<TPrimitives.IconShape>

            viewCreator?: TComponents.ComponentCreator<TPrimitives.ViewShape>
            textCreator?: TComponents.ComponentCreator<TPrimitives.TextShape>
            iconCreator?: TComponents.ComponentCreator<TPrimitives.IconShape>
            scrollViewCreator?: TComponents.ComponentCreator<TPrimitives.ScrollViewShape>
            animatedViewCreator?: TComponents.ComponentCreator<TPrimitives.ViewShape>
            animatedTextCreator?: TComponents.ComponentCreator<TPrimitives.TextShape>
            animatedIconCreator?: TComponents.ComponentCreator<TPrimitives.IconShape>

            getView?: TComponents.GetComponent<TPrimitives.ViewShape>
            getText?: TComponents.GetComponent<TPrimitives.TextShape>
            getIcon?: TComponents.GetComponent<TPrimitives.IconShape>
            getScrollView?: TComponents.GetComponent<TPrimitives.ScrollViewShape>
            getAnimatedView?: TComponents.GetComponent<TPrimitives.ViewShape>
            getAnimatedText?: TComponents.GetComponent<TPrimitives.TextShape>
            getAnimatedIcon?: TComponents.GetComponent<TPrimitives.IconShape>

        }
    }
}
