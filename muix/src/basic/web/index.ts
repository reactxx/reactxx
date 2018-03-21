window.isWeb = true

import React from 'react'
import ReactN from 'react-native'

export { TBasic } from '../typings/basic'
export { default as LoremIpsum } from '../common/loremipsum'
export * from '../common/makeXPlatform'
export * from './fela'

import { TBasic } from '../typings/basic'
import * as sheets from '../common/sheets'
import { makeXPlatform } from '../common/makeXPlatform'
import * as Comps from './components'

export const Text: TBasic.ComponentTypeX<TBasic.TextShape> = makeXPlatform(sheets.textSheet)(Comps.text)
export const AnimatedText: TBasic.ComponentTypeX<TBasic.TextShape> = makeXPlatform(sheets.textSheet)(Comps.animatedText)
export const View: TBasic.ComponentTypeX<TBasic.ViewShape> = makeXPlatform<TBasic.ViewShape>(sheets.viewSheet)(Comps.view)
export const AnimatedView: TBasic.ComponentTypeX<TBasic.ViewShape> = makeXPlatform<TBasic.ViewShape>(sheets.viewSheet)(Comps.animatedView)
export const Icon: TBasic.ComponentTypeX<TBasic.IconShape> = makeXPlatform<TBasic.IconShape>(sheets.iconSheet)(Comps.icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TBasic.IconShape> = makeXPlatform<TBasic.IconShape>(sheets.iconSheet)(Comps.animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TBasic.ScrollViewShape> = makeXPlatform<TBasic.ScrollViewShape>(sheets.scrollViewSheet)(Comps.scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TBasic.ScrollViewShape> = makeXPlatform<TBasic.ScrollViewShape>(sheets.scrollViewSheet)(Comps.animatedScrollView)
