window.isWeb = false

import React from 'react'
import ReactN from 'react-native'

export { TBasic } from '../typings/basic'
export { TComps } from '../typings/components'
export { default as LoremIpsum } from '../common/loremipsum'
export * from '../common/withStyles'

import { TBasic } from '../typings/basic'
import { TComps } from '../typings/components'
import * as sheets from '../common/sheets'
import { withStyles } from '../common/withStyles'
import * as Comps from './components'

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(sheets.textSheet)(Comps.text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(sheets.textSheet)(Comps.animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(sheets.viewSheet)(Comps.view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(sheets.viewSheet)(Comps.animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(sheets.iconSheet)(Comps.icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(sheets.iconSheet)(Comps.animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(sheets.scrollViewSheet)(Comps.scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(sheets.scrollViewSheet)(Comps.animatedScrollView)

