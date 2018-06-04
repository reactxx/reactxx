import React from 'react'
import ReactN from 'react-native'

import { TCommon } from '../typings/common'
import { TCommonStyles } from '../typings/common-styles'
import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'
import { TRenderState } from './withStyles'
import { deepMerges, deepMerge, immutableMerge } from './to-platform'

type Cache = { [variantId: string]: StaticSheet }[]

interface StaticSheet {
  codeClasses: Types.Sheet
  addIns?
  isConstant?: boolean
}

const enum GetPlatformSheetLowMode { patch, cache, noCache }

interface GetPlatformSheetPar { id: number; createSheetX: Types.SheetCreatorX; themeContext: TCommon.ThemeContext; sheetXPatch: Types.PartialSheetX[]; defaultClasses?: Types.PartialSheetX ; variant; variantCacheId: string }

// call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
export const getPlatformSheet = (par: GetPlatformSheetPar) => {
  const { sheetXPatch, defaultClasses, createSheetX} = par
  const patches: Types.PartialSheetX[] = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
  return sheetXPatch ? getPlatformSheetLow({ ...par, sheetXPatch: patches }, GetPlatformSheetLowMode.patch) : getFromCache({ ...par, sheetXPatch: patches })
}

const getPlatformSheetLow = ({ id, createSheetX, themeContext, sheetXPatch, variant, variantCacheId }: GetPlatformSheetPar, mode: GetPlatformSheetLowMode) => {
  const sheet = typeof createSheetX === 'function' ? createSheetX(themeContext.theme, variant) : createSheetX
  const isPatchValue = mode === GetPlatformSheetLowMode.patch && typeof createSheetX !== 'function'
  const merged = sheetXPatch ? (isPatchValue ? deepMerges({}, sheet, ...sheetXPatch) : deepMerges(sheet, ...sheetXPatch)) : sheet
  const isConst = isPatchValue && !sheetXPatch
  return { codeClasses: null, addIns: null } as StaticSheet
}

const getFromCache = (par: GetPlatformSheetPar) => {
  const { id, createSheetX, variant, variantCacheId, themeContext: { $cache, theme } } = par
  const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null
  const res = cacheId ? fromCache($cache, id, cacheId, () => getPlatformSheetLow(par, GetPlatformSheetLowMode.cache)) : getPlatformSheetLow(par, GetPlatformSheetLowMode.noCache)
  res.isConstant = !!cacheId
  return res
}

const fromCache = ($cache: Cache, id: number, variantCacheId: string, getter: () => StaticSheet) => {
  let compCache = $cache[id]
  if (!compCache) $cache[id] = compCache = {}
  return compCache[variantCacheId] || (compCache[variantCacheId] = getter())
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

//interface StaticSheet extends SheetWithAddIns {
//  isConstant?: boolean
//}

const toPlatformSheetInPlace = (codeClasses: Types.PartialSheetX) => {
  if (!isObject(codeClasses)) return { codeClasses } as StaticSheet
  let addIns
  for (const p in codeClasses) {
    if (p.charAt(0) === '$') {
      if (!addIns) addIns = {}
      addIns[p] = codeClasses[p]
      delete codeClasses[p]
      continue
    }
    const ruleset = toPlatformRuleSetInPlace(codeClasses[p])
    codeClasses[p] = ruleset.style as any
    if (ruleset.addIn) {
      if (!addIns) addIns = {}
      addIns[p] = ruleset.addIn
    }
  }
  return { codeClasses, addIns } as StaticSheet
}

const mergeRulesetInPlace = (target, source) => Object.assign(target, source)
const isObject = item => item && typeof item === 'object'


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
//const callCreator = <T extends {}>(theme: TCommon.ThemeBase, variant, creator: T | ((theme: TCommon.ThemeBase, variant) => T)) => typeof creator === 'function' ? creator(theme, variant) : creator

//const callCreateSheet = ({ id, createSheetX, themeContext, sheetXPatch, defaultClasses, variant, variantCacheId }: GetPlatformSheetPar) => {

//  const { $cache, theme } = themeContext

//  if (typeof createSheetX !== 'function')
//    return sheetXPatch ? deepMerge({}, createSheetX) : createSheetX

//  if (!variant)
//    return sheetXPatch ? createSheetX(theme, null) : fromCache($cache, id, '#novariant#', () => createSheetX(theme, null))

//  if (variantCacheId)
//    return sheetXPatch ? createSheetX(theme, null) : fromCache($cache, id, variantCacheId, () => createSheetX(theme, variant))

//  return createSheetX(theme, variant) //getVariant!=null && variantToString==null => NO CACHING

//}

//const callCreateSheet_ = (par: GetPlatformSheetPar) => {

//  const { id, createSheetX, variant, variantCacheId, themeContext: { $cache, theme } } = par

//  if (typeof createSheetX !== 'function')
//    return fromCache($cache, id, '#static#', () => getPlatformSheetLow(par))

//  if (!variant)
//    return fromCache($cache, id, '#novariant#', () => getPlatformSheetLow(par))

//  if (variantCacheId)
//    return fromCache($cache, id, variantCacheId, () => getPlatformSheetLow(par))

//  return getPlatformSheetLow(par) //getVariant!=null && variantToString==null => NO CACHING

//}

