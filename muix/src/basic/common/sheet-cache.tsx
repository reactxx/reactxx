import React from 'react'
import ReactN from 'react-native'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { TRenderState } from './withStyles'


//const convertToPlatform = (displayName: string, id: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

//  const { propsPatch, finalProps, addInProps } = renderState
//  const { onPress, onLongPress, onPressIn, onPressOut, ...rest } = finalProps as Types.PropsX & Types.OnPressAllX
//  const { theme, $cache } = renderState.themeContext
//  let variantCacheId
//  let variant = null

//  const propsWithPatch = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
//  variant = options.getVariant(propsWithPatch, theme)
//  variantCacheId = options.variantToString && options.variantToString(variant)

//  //** STATIC SHEET
//  let staticSheet: Types.Sheet & { $isCached?: boolean }
//  let getStaticSheet: () => Types.Sheet
//  if (typeof createSheetX !== 'function') {
//    variantCacheId = '#static#'
//    getStaticSheet = () => toPlatformSheet(createSheetX)
//  } else {
//    if (options && options.getVariant) {
//      const propsWithPatch = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
//      variant = options.getVariant(propsWithPatch, theme)
//      variantCacheId = options.variantToString && options.variantToString(variant)
//      if (variantCacheId) {
//        getStaticSheet = () => toPlatformSheet(callCreator(theme, variant, createSheetX))
//      } else {
//        //getVariant!=null && variantToString==null => NO CACHING
//        staticSheet = toPlatformSheet(callCreator(theme, variant, createSheetX))
//      }
//    } else {
//      variantCacheId = '#novariant#'
//      getStaticSheet = () => toPlatformSheet(callCreator(theme, null, createSheetX))
//    }
//  }

//  if (!staticSheet) {
//    let compCache = $cache[id]
//    if (!compCache) $cache[id] = compCache = {}
//    staticSheet = compCache[variantCacheId]
//    if (!staticSheet) {
//      compCache[variantCacheId] = staticSheet = getStaticSheet();
//      staticSheet.$isCached = true
//    }
//  }

//  //** MERGE staticSheet with classes and className
//  const root = className && { root: toPlatformRuleSet(callCreator(theme, variant, className)) }
//  const rootStyle = !window.isWeb && style && { root: toPlatformRuleSet(callCreator(theme, variant, style)) }
//  if (classes || root || rootStyle) {
//    renderState.codeClasses = deepModify(staticSheet, toPlatformSheet(callCreator(theme, variant, classes)), root, rootStyle)
//    delete renderState.codeClasses.$isCached
//  } else
//    renderState.codeClasses = staticSheet

//  if (addInProps.$developer_flag) {
//    console.log(
//      `### withStyles PREPARE SHEET for ${displayName}`,
//      '\nstaticSheet: ', staticSheet,
//      '\nroot: ', root,
//      '\nclasses: ', classes,
//    )
//  }

//  //// separate AddIns from sheet to $classes
//  //let finalCodeClasses = renderState.codeClasses
//  //renderState.addInClasses = {} as any
//  //for (const p in renderState.codeClasses) {
//  //  if (p.startsWith('$')) {
//  //    if (finalCodeClasses.$isCached) { // cannot modify $isCached codeClasses => make shallow copy
//  //      finalCodeClasses = { ...renderState.codeClasses }
//  //      delete finalCodeClasses.$isCached
//  //    }
//  //    renderState.addInClasses[p] = finalCodeClasses[p]
//  //    delete finalCodeClasses[p] // modify finalCodeClasses
//  //    continue
//  //  }
//  //}
//  //renderState.codeClasses = finalCodeClasses


//  renderState.codeProps = rest as Types.CodeProps

//  //** RETURN platform dependent props for pure component code
//  const systemFromPatch = propsPatch.length > 0 ? Object.assign({}, ...propsPatch) : null
//  renderState.codeSystemProps = {
//    ...systemFromPatch,
//    classes: null,
//    style: window.isWeb ? toPlatformRuleSet(callCreator(theme, variant, style)) : undefined,
//    variant,
//  } as Types.CodeSystemProps

//  toPlatformEvents($web, $native as Types.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, renderState.codeProps, renderState.codeSystemProps)
//}
const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

interface SheetWithAddIns {
  sheet: Types.Sheet
  addIns?
}
interface StaticSheet extends SheetWithAddIns {
  isConstant?: boolean
}
type Cache = { [variantId: string]: StaticSheet }[]

const getStaticSheetFromCache = (id: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, propsPatch: TAddIn.CodeProps[], finalProps: Types.PropsX, themeContext: TCommon.ThemeContext) => {

  const { $cache, theme } = themeContext

  if (typeof createSheetX !== 'function')
    return fromCache($cache, id, '#static#', () => toPlatformSheetInPlace(createSheetX))

  if (!options || !options.getVariant)
    return fromCache($cache, id, '#novariant#', () => toPlatformSheetInPlace(createSheetX(theme, null)))

  const propsWithPatch = propsPatch.length > 0 ? Object.assign({}, finalProps, ...propsPatch) : finalProps
  const variant = options.getVariant(propsWithPatch, theme)
  const variantCacheId = options.variantToString && options.variantToString(variant)

  if (variantCacheId)
    return fromCache($cache, id, variantCacheId, () => toPlatformSheetInPlace(createSheetX(theme, variant)))

  return toPlatformSheetInPlace(createSheetX(theme, variant)) //getVariant!=null && variantToString==null => NO CACHING

}

const fromCache = ($cache: Cache, id: number, variantCacheId: string, getter: () => StaticSheet) => {
  let compCache = $cache[id]
  if (!compCache) $cache[id] = compCache = {}
  let cacheItem = compCache[variantCacheId]
  if (!cacheItem) {
    compCache[variantCacheId] = cacheItem = getter();
    cacheItem.isConstant = true
  }
  return cacheItem
}

const toPlatformRuleSetInPlace = (style: Types.RulesetX) => {
  if (!isObject(style)) return { style, addIn: null }
  let addIn, $web, $native
  for (const p in style) {
    if (p === '$web') $web = style[p]
    else if (p === '$native') $native = style[p]
    else if (p.charAt(0) === '$') { if (!addIn) addIn = {}; addIn[p] = style[p] }
    else continue
    delete style[p]
  }
  if ($web && window.isWeb) mergeRulesetInPlace(style, $web)
  else if ($native && !window.isWeb) mergeRulesetInPlace(style, $native)
  return { style, addIn }
}

const toPlatformSheetInPlace = (sheet: Types.PartialSheetX) => {
  if (!isObject(sheet)) return { sheet } as StaticSheet
  let addIns
  for (const p in sheet) {
    if (p.charAt(0) === '$') {
      if (!addIns) addIns = {}
      addIns[p] = sheet[p]
      continue
    }
    const ruleset = toPlatformRuleSetInPlace(sheet[p])
    sheet[p] = ruleset.style as any
    if (ruleset.addIn) {
      if (!addIns) addIns = {}
      addIns[p] = ruleset.addIn
    }
  }
  return { sheet, addIns } as StaticSheet
}

const mergeRulesetInPlace = (target, source) => Object.assign(target, source)
const isObject = item => item && typeof item === 'object'