import React from 'react'
import ReactN from 'react-native'

import { withStyles } from '../common/withStyles-simple'
import * as sheet from '../common/comps-sheets'
import { TBasic } from '../typings/basic'
import { TComps } from '../typings/comps'

//  platform specific code
import * as Comps from './comps'

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(sheet.textSheet)(Comps.text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(sheet.textSheet)(Comps.animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(sheet.viewSheet)(Comps.view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(sheet.viewSheet)(Comps.animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(sheet.iconSheet)(Comps.icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(sheet.iconSheet)(Comps.animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(sheet.scrollViewSheet)(Comps.scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(sheet.scrollViewSheet)(Comps.animatedScrollView)

export { withStyles }

export * from './comps'
export * from './to-platform'
export * from '../common/develop'
export * from '../common/comps-sheets'
export * from '../typings/index'
//export * from '../typings/typescript-config'

