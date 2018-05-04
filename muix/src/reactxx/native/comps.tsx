import * as Primitives from 'reactxx-primitives'
import { TComps, CompNames } from 'reactxx-primitives'

import { TBasic } from '../typings/basic'
import { withStyles } from '../common/withStyles'

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, Primitives.textSheet)(Primitives.text as TBasic.CodeComponentType<TComps.TextShape>)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, Primitives.textSheet)(Primitives.animatedText as TBasic.CodeComponentType<TComps.TextShape>)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, Primitives.viewSheet)(Primitives.view as TBasic.CodeComponentType<TComps.ViewShape>)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, Primitives.viewSheet)(Primitives.animatedView as TBasic.CodeComponentType<TComps.ViewShape>)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, Primitives.iconSheet)(Primitives.icon as TBasic.CodeComponentType<TComps.IconShape>)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, Primitives.iconSheet)(Primitives.animatedIcon as TBasic.CodeComponentType<TComps.IconShape>)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, Primitives.scrollViewSheet)(Primitives.scrollView as TBasic.CodeComponentType<TComps.ScrollViewShape>)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, Primitives.scrollViewSheet)(Primitives.animatedScrollView as TBasic.CodeComponentType<TComps.ScrollViewShape>)
