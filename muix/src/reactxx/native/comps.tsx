import * as Primitives from 'reactxx-primitives'
import { TComps, CompNames } from 'reactxx-primitives'

import { Types } from '../typings/types'
import { withStylesCreator } from '../common/withStyles'

export const Text: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(Primitives.textSheet, Primitives.text as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.Text})()
export const AnimatedText: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(Primitives.textSheet, Primitives.animatedText as Types.CodeComponentType<TComps.TextShape>, {name:CompNames.AnimatedText})()
export const View: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(Primitives.viewSheet, Primitives.view as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.View})()
export const AnimatedView: Types.ComponentTypeX<TComps.ViewShape> = withStylesCreator(Primitives.viewSheet, Primitives.animatedView as Types.CodeComponentType<TComps.ViewShape>, {name:CompNames.AnimatedView})()
export const Icon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(Primitives.iconSheet, Primitives.icon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.Icon})()
export const AnimatedIcon: Types.ComponentTypeX<TComps.IconShape> = withStylesCreator(Primitives.iconSheet, Primitives.animatedIcon as Types.CodeComponentType<TComps.IconShape>, {name:CompNames.AnimatedIcon})()
export const ScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(Primitives.scrollViewSheet, Primitives.scrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.ScrollView})()
export const AnimatedScrollView: Types.ComponentTypeX<TComps.ScrollViewShape> = withStylesCreator(Primitives.scrollViewSheet, Primitives.animatedScrollView as Types.CodeComponentType<TComps.ScrollViewShape>, {name:CompNames.AnimatedScrollView})()
