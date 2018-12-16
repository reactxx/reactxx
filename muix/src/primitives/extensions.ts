import { TComponents, TTyped } from 'reactxx-typings'
import { TPrimitives } from './shapes'

import { DomPopmotionConfig } from 'popmotion-pose'

declare module 'reactxx-typings' {

    namespace TExtensions {

        interface Shape {
            pose?: Record<string, TTyped.RulesetIds>
        }

        interface ComponentConfig {
            isAnimated?: boolean
        }
        interface Config<R extends TTyped.Shape = TTyped.Shape> {
            isAnimated?: boolean
            getComponent?: TComponents.GetComponent<R>
        }


        interface Platform {
            View?: TComponents.SFC<TPrimitives.ViewShape>
            Text?: TComponents.SFC<TPrimitives.TextShape>
            Icon?: TComponents.SFC<TPrimitives.IconShape>
            ScrollView?: TComponents.SFC<TPrimitives.ScrollViewShape>
            AnimatedView?: TComponents.SFC<TPrimitives.ViewShape>
            AnimatedText?: TComponents.SFC<TPrimitives.TextShape>
            AnimatedIcon?: TComponents.SFC<TPrimitives.IconShape>
        }
    }
}
