import React from 'react'
import ReactN from 'react-native'

import { withStyles } from '../common/withStyles'

import * as Comps from 'reactxx-basic/comps'
import * as sheets from 'reactxx-basic/sheets'
import { TBasic, TComps } from 'reactxx-basic/typings'
import { CompNames } from 'reactxx'

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, sheets.textSheet)(Comps.text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, sheets.textSheet)(Comps.animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, sheets.viewSheet)(Comps.view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, sheets.viewSheet)(Comps.animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, sheets.iconSheet)(Comps.icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, sheets.iconSheet)(Comps.animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, sheets.scrollViewSheet)(Comps.scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, sheets.scrollViewSheet)(Comps.animatedScrollView)
