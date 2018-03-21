import React from 'react'
import ReactN from 'react-native'

import { TBasic } from '../typings/basic'
import { TComps } from '../typings/comps'
import * as sheets from '../common/sheets'
import { withStyles } from '../common/withStyles'

//  platform specific code
import * as Comps from './comps'

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(sheets.textSheet)(Comps.text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(sheets.textSheet)(Comps.animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(sheets.viewSheet)(Comps.view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(sheets.viewSheet)(Comps.animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(sheets.iconSheet)(Comps.icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(sheets.iconSheet)(Comps.animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(sheets.scrollViewSheet)(Comps.scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(sheets.scrollViewSheet)(Comps.animatedScrollView)

export { withStyles }

export * from './comps'
export * from './develop'
export * from './to-platform'
export * from './typings'