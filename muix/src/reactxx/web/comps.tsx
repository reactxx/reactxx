import * as Primitives from 'reactxx-primitives'
import { TComps, CompNames } from 'reactxx-primitives'

import { Types } from '../typings/types'
import { withStyles } from '../common/withStyles'

export const Text: Types.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, Primitives.textSheet)(Primitives.text as Types.CodeComponentType<TComps.TextShape>)
export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, Primitives.textSheet)(Primitives.animatedText as Types.CodeComponentType<TComps.TextShape>)
export const View: Types.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, Primitives.viewSheet)(Primitives.view as Types.CodeComponentType<TComps.ViewShape>)
export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, Primitives.viewSheet)(Primitives.animatedView as Types.CodeComponentType<TComps.ViewShape>)
export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, Primitives.iconSheet)(Primitives.icon as Types.CodeComponentType<TComps.IconShape>)
export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, Primitives.iconSheet)(Primitives.animatedIcon as Types.CodeComponentType<TComps.IconShape>)
export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, Primitives.scrollViewSheet)(Primitives.scrollView as Types.CodeComponentType<TComps.ScrollViewShape>)
export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, Primitives.scrollViewSheet)(Primitives.animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>)
