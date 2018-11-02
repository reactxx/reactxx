import { TComponents, TWithStyles } from 'reactxx-typings'
import { TPrimitives } from './d-index'

declare module 'reactxx-typings' {

    namespace TVariants {

        interface Platform {
            view?: TComponents.SFCCode<TPrimitives.ViewShape>
            viewCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.ViewShape>
            View?: TComponents.ComponentClass<TPrimitives.ViewShape>

            text?: TComponents.SFCCode<TPrimitives.TextShape>
            textCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.TextShape>
            Text?: TComponents.ComponentClass<TPrimitives.TextShape>

            icon?: TComponents.SFCCode<TPrimitives.IconShape>
            iconCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.IconShape>
            Icon?: TComponents.ComponentClass<TPrimitives.IconShape>

            scrollView?: TComponents.SFCCode<TPrimitives.ScrollViewShape>
            scrollViewCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.ScrollViewShape>
            ScrollView?: TComponents.ComponentClass<TPrimitives.ScrollViewShape>

            animatedView?: TComponents.SFCCode<TPrimitives.ViewShape>
            animatedViewCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.ViewShape>
            AnimatedView?: TComponents.ComponentClass<TPrimitives.ViewShape>

            animatedText?: TComponents.SFCCode<TPrimitives.TextShape>
            animatedTextCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.TextShape>
            AnimatedText?: TComponents.ComponentClass<TPrimitives.TextShape>

            animatedIcon?: TComponents.SFCCode<TPrimitives.IconShape>
            animatedIconCreator?: TWithStyles.WithStylesCreatorResult<TPrimitives.IconShape>
            AnimatedIcon?: TComponents.ComponentClass<TPrimitives.IconShape>

        }


    }


}
