import React from 'react'
import ReactN from 'react-native'

import { withStyles } from '../common/withStyles'

import { TBasic, TComps, text, textSheet, animatedText, view, viewSheet, animatedView, icon, iconSheet, animatedIcon, scrollView, scrollViewSheet, animatedScrollView } from 'reactxx-basic'

import { CompNames } from 'reactxx'

export const Text: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.Text, textSheet)(text)
export const AnimatedText: TBasic.ComponentTypeX<TComps.TextShape> = withStyles(CompNames.AnimatedText, textSheet)(animatedText)
export const View: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.View, viewSheet)(view)
export const AnimatedView: TBasic.ComponentTypeX<TComps.ViewShape> = withStyles(CompNames.AnimatedView, viewSheet)(animatedView)
export const Icon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.Icon, iconSheet)(icon)
export const AnimatedIcon: TBasic.ComponentTypeX<TComps.IconShape> = withStyles(CompNames.AnimatedIcon, iconSheet)(animatedIcon)
export const ScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.ScrollView, scrollViewSheet)(scrollView)
export const AnimatedScrollView: TBasic.ComponentTypeX<TComps.ScrollViewShape> = withStyles(CompNames.AnimatedScrollView, scrollViewSheet)(animatedScrollView)
