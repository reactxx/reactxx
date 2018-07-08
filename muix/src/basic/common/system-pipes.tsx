﻿import React from 'react'
import warning from 'warning'

import { TSheeter } from 'reactxx-sheeter'
import * as Sheeter from 'reactxx-sheeter'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { getPlatformSheet, toPlatformRulesets, immutableMerge, mergeRulesetsParts, toPlatformSheets } from './to-platform'
import { TAddIn } from '../typings/add-in'
import { TCommonStyles } from '../typings/common-styles'
import { themePipe } from './theme'
import { RenderAddIn, TRenderState } from './withStyles'

export interface FinalizePropsOutput {
  platformProps: Types.CodeProps
  //addInProps: TAddIn.PropsX
}

export const getSystemPipes = <R extends Types.Shape>(
  id: number,
  displayName: string,
  sheetCreator: Types.SheetCreatorX<R>,
  addIns: RenderAddIn,
  options: Types.WithStyleOptions_ComponentX<R>) => {

  const defaultPropsSeparated: Types.SeparatedProps = options.defaultProps && separateProps(options.defaultProps)

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = options.withCascading ? React.createContext<SeparatedPropsArray>(null) : { Provider: null, Consumer: null } as React.Context<SeparatedPropsArray>

  class CascadingProviderComponent extends React.Component<Types.PropsX> {

    render() {
      if (!options.withCascading) {
        warning(DEV_MODE, `Component.Provider does not exist (component.name=${name}). Use 'C' variant of the component, e.g. <LabelC.Provider><LabelC>. 'C' variant of the component is created by e.g. 'LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label); export const LabelC = LabelCreator({ withCascading: true})'`) //`
        return this.props.children
      }
      return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
    }

    CASCADING = (cascadingProps: SeparatedPropsArray) => {
      const item = separateProps(this.props)
      return <CascadingProvider value={cascadingProps ? [...cascadingProps, item] : [item]}>{this.props.children}</CascadingProvider >
    }

  }

  const finalizeEvent = (finalProps: Types.OnPressAllX, propName: TCommon.TEvents, eventsPlatform, platformName: string, renderState: TRenderStateEx) => {
    const proc: any = eventsPlatform && platformName[platformName] || finalProps[propName]
    delete finalProps[propName]; if (eventsPlatform) delete eventsPlatform[platformName]
    if (!proc || proc['$wrapped']) return
    const newProc = finalProps[platformName] = renderState.platformProps.$system[propName] = (ev: any) => {
      ev = ev && !ev.constructor ? { ...ev } : {}
      ev.current = renderState.finalProps
      proc(ev)
    }
    newProc['$wrapped'] = true
  }
  const finalizeEvents = (finalProps: Types.PropsX & Types.OnPressAllX, renderState: TRenderStateEx) => {
    const eventsPlatform = window.isWeb ? finalProps.$web : finalProps.$native
    finalizeEvent(finalProps, 'onPress', eventsPlatform, window.isWeb ? 'onClick' : 'onPress', renderState)
    finalizeEvent(finalProps, 'onPressIn', eventsPlatform, window.isWeb ? 'onMouseDown' : 'onPressIn', renderState)
    finalizeEvent(finalProps, 'onPressOut', eventsPlatform, window.isWeb ? 'onMouseUp' : 'onPressOut', renderState)
    finalizeEvent(finalProps, 'onLongPress', eventsPlatform, window.isWeb ? '?' : 'onLongPress', renderState)
  }

  const toPlatformProps = (cascadingSeparatedPropsArray: SeparatedPropsArray, currentProps: Types.PropsX, renderState: TRenderStateEx) => {

    const _defaultPropsNoClasses = defaultPropsSeparated ? { ...defaultPropsSeparated, classes: null } : null

    const allSeparatedPropsArray: SeparatedPropsArray = [_defaultPropsNoClasses, ...cascadingSeparatedPropsArray || [], separateProps(currentProps)]

    const theme = renderState.themeContext.theme

    // accumulate Types.StyleFromProps[] to Types.StylesFromProps
    const accumulatedSeparatedProps = renderState.separatedStyles = allSeparatedPropsArray.reduce<AccumulatedStylesAndProps>((prev, curr) => {
      if (!curr) return prev
      if (curr.rest) prev.props.push(curr.rest)
      if (curr.$themedProps) prev.props.push(curr.$themedProps(theme))
      if (curr.className) prev.className.push(curr.className)
      if (curr.classes) prev.classes.push(curr.classes)
      if (curr.style) prev.style.push(curr.style)
      return prev
    }, { props: [], classes: [], className: [], style: [] })

    const needsDeepMerge = accumulatedSeparatedProps.props.length > 1

    // merge non-style props
    const mergedProps: Types.PropsX = needsDeepMerge ? Sheeter.deepMerges({}, accumulatedSeparatedProps.props) : { ...accumulatedSeparatedProps.props[0] }
    delete accumulatedSeparatedProps.props

    debugger
    // use sheeter utils for props finishing (linearize $web and $native props, extract addIns (e.g. $mediaq))
    const platformProps = Sheeter.finishProps(mergedProps as TSheeter.Sheet, addIns.finishAddInProps)

    // remove developer_flag for non 'development' ENV
    if (!DEV_MODE && platformProps.$developer_flag) delete platformProps.$developer_flag

    // events
    if (!platformProps.$system) platformProps.$system = {}
    finalizeEvents(platformProps, renderState)

    // process $web and $native props part
    //const { $web, $native } = platformProps
    //delete platformProps.$web; delete platformProps.$native
    //if ($web && window.isWeb) platformProps = needsDeepMerge ? deepMerges(platformProps, [$web]) : deepMerges({}, platformProps, $web)
    //if ($native && !window.isWeb) platformProps = needsDeepMerge ? deepMerges(platformProps, $native) : deepMerges({}, platformProps, $native)

    // separate addIns props (starting with $)
    //const addInProps: any = {}
    //for (const p in platformProps) {
    //  if (p.startsWith('$')) {
    //    addInProps[p] = platformProps[p]; delete platformProps[p] // move props from platformProps to addInProps, e.g. $developer_flag:true, $mediaq: {'-640': {}}
    //  }
    //}

    return platformProps as Types.CodeProps //{ platformProps: platformProps as Types.CodeProps } as FinalizePropsOutput
  }

  const toPlatformStyle = (displayName: string, id: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderStateEx) => {

    const { codePropsPatch, platformProps, addInProps, separatedStyles, getPropsPatches } = renderState
    const { theme, $cache } = renderState.themeContext

    // **** merge patches and eventsX to finalProps
    const propPatches = Sheeter.getPropsPatch(platformProps.$system as TSheeter.AddIns, getPropsPatches)//: Types.PartialCodeProps[] = Object.keys(codePropsPatch).map(p => codePropsPatch[p])
    //if (eventsX) propPatches.push({ $system: { ...eventsX } } as Types.PartialCodeProps)
    const finalProps: Types.CodeProps = renderState.finalProps = immutableMerge(platformProps, propPatches)
    //if (!finalProps.$system) finalProps.$system = {} as any
    const system = finalProps.$system

    // **** variant
    let variant: {} = null
    let variantCacheId: string = null
    const expandCreator = creator => typeof creator === 'function' ? creator(theme, variant) : creator

    if (options && options.getVariant) {
      variant = system.variant = options.getVariant(finalProps, theme)
      variantCacheId = options.variantToString ? options.variantToString(variant) : null
    }

    // **** style (for web only). For native: is included in sheetXPatch.root.
    const toMergeStylesCreators = window.isWeb && separatedStyles.style.length > 0 ? separatedStyles.style : null
    const toMergeStylesX: Types.RulesetX[] = !toMergeStylesCreators ? null : toMergeStylesCreators.map(creator => expandCreator(creator))

    if (toMergeStylesX) system.style = toPlatformRulesets(toMergeStylesX)

    // **** sheet patch (for native: style included)
    const toMergeSheetCreators = [
      ...separatedStyles.classes || null,
      ...separatedStyles.className.map(className => ({ root: className })),
      ... (window.isWeb ? [] : separatedStyles.style.map(style => ({ root: style })))]
    const sheetXPatch: Types.PartialSheetX[] = toMergeSheetCreators.length === 0 ? null : toMergeSheetCreators.map(creator => expandCreator(creator))
    const defaultClasses: Types.PartialSheetX = !defaultPropsSeparated ? null : typeof defaultPropsSeparated.classes === 'function' ? expandCreator(defaultPropsSeparated.classes) : defaultPropsSeparated.classes

    // **** apply sheet patch to sheet:
    // call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
    const { codeClasses, addInClasses } = getPlatformSheet({ id, finishAddInClasses: addIns.finishAddInClasses as any, createSheetX, themeContext: renderState.themeContext, sheetXPatch, defaultClasses, variant, variantCacheId })
    renderState.addInClasses = addInClasses //e.g {$animations:..., root: {$mediaq:...}}
    renderState.finalProps.$system.classes = codeClasses
  }

  const propsPipe = (input: () => { props: Types.PropsX, renderState: TRenderStateEx }, output: (par: Types.CodeProps) => void, next: () => React.ReactNode) => {
    let props: Types.PropsX, renderState: TRenderState
    const render = (cascadingStyleFromPropsArray: SeparatedPropsArray) => {
      output(toPlatformProps(cascadingStyleFromPropsArray, props, renderState))
      return next()
    }
    const res = () => {
      const inp = input()
      props = inp.props; renderState = inp.renderState
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(toPlatformProps(null, props, renderState))
      return next()
    }
    return res
  }

  const stylePipe = (state: TRenderState, next: () => React.ReactNode) => {
    const res = () => {
      toPlatformStyle(displayName, id, sheetCreator, options, state)
      return next()
    }
    return res
  }

  const renderComponentPipe = (renderState: TRenderState, CodeComponent: Types.CodeComponentType) => () => {

    const { finalProps, codeClassesPatch, addInProps, addInClasses } = renderState

    if (addInProps.$developer_flag) {
      const { themeContext, codePropsPatch } = renderState
      console.log(
        `### withStyles RENDER CODE for ${displayName}`,
        '\nfinalProps: ', finalProps,
        '\naddInProps: ', addInProps,
        '\ntheme: ', themeContext.theme,
        '\npropsPatch: ', codePropsPatch,
        '\ncodeClassesPatch: ', codeClassesPatch,
      )
    }

    // method, called in component code: ruleset merging
    finalProps.$system.mergeRulesets = (...rulesets: TCommon.RulesetFragmentsParts) => {
      const res = mergeRulesets(
        consolidePatches(codeClassesPatch),
        addInClasses,
        rulesets) as Types.TMergeRulesetsResult<any>
      if (addInProps.$developer_flag) {
        console.log(
          `### mergeRulesets for ${displayName}`,
          res
        )
      }
      return res
    }

    //console.log('*** render code: ', renderState.$developer_id)

    // call component code
    return <CodeComponent {...finalProps as Types.CodeProps<R>} />
  }

  return { propsPipe, stylePipe, renderComponentPipe, cascadingProvider: CascadingProviderComponent as any as React.ComponentClass<Types.PropsX<R>> }

}

//export const whenUsedFinishAddIns = (addInClasses: {}) => {
//  // addIns = e.g. { root: { $whenUsed: [ { disabled: Types.RulesetX } ] } }
//  for (const p in addInClasses) {
//    const addInsp = addInClasses[p]
//    const $whenUsed: Array<{}> = addInsp && addInsp[$whenUsedPropName]
//    if (!$whenUsed) continue
//    // output: addIns.root.$whenUsed = e.g. { name: 'disabled', __fragments: [ {...} ] }
//    addInClasses[p][$whenUsedPropName] = toPlatformSheets(null, $whenUsed).codeClasses
//  }
//}


const $whenUsedPropName = '$whenUsed'

/************************
* PRIVATE
*************************/

// convert TCommon.SheetPatch to TCommon.SheetPatchFinal ( => remove AddIn's name hiearchy) 
const consolidePatches = (codeClassesPatch: TCommon.SheetPatch) => {
  if (!codeClassesPatch) return null
  const arrayCanModify: { [rulesetName: string]: boolean } = {}
  const codeClassesPatchFinal: TCommon.SheetPatchFinal = {}
  for (const addInName in codeClassesPatch) {
    const addIn = codeClassesPatch[addInName]
    for (const rulesetName in addIn) {
      let final = codeClassesPatchFinal[rulesetName], addInp = addIn[rulesetName]
      // optimize merging ruleset's fragments
      if (!final) codeClassesPatchFinal[rulesetName] = addInp //first addIn[rulesetName] => use it
      else if (arrayCanModify[rulesetName]) Array.prototype.push.apply(final, addInp) // > second => modify result
      else { // second => concat first and second to new array
        codeClassesPatchFinal[rulesetName] = final.concat(addInp)
        arrayCanModify[rulesetName] = true
      }
    }
  }
  return codeClassesPatchFinal
}

const mergeRulesets = (codeClassesPatch: TCommon.SheetPatchFinal, addInClasses: TCommon.TAddIns, rulesets: TCommon.RulesetFragmentsParts) => {

  if (!rulesets || rulesets.length === 0) return null

  // get used ruleset names (some of them could apear in addInClasses $whenUsed)
  let usedRulesetNames: {} = null
  if (addInClasses) rulesets.forEach((r: TCommon.RulesetFragments) => {
    if (!r || !r.__fragments || !r.name) return
    (usedRulesetNames || (usedRulesetNames = {}))[r.name] = true
  })

  if (!usedRulesetNames && !codeClassesPatch) return mergeRulesetsParts(rulesets)

  // for every ruleset: apply patches and resolve "$whenUsed" addIn
  const finalRulesets = rulesets.map((r: TCommon.RulesetFragments) => {
    const name = r && r.__fragments && r.name
    if (!name) return r
    // get patch
    const patch = codeClassesPatch && codeClassesPatch[name]
    // gen whenUses
    const $whenUses: TCommon.SheetFragmentsData = usedRulesetNames && addInClasses[name] && addInClasses[name][$whenUsedPropName]
    let $whenUsedPatch: {}[] = null // fragments of used $whenUses
    if ($whenUses) for (const p in $whenUses) {
      if (!usedRulesetNames[p]) return // not used
      let isSecond = true
      if (!$whenUsedPatch) $whenUsedPatch = $whenUses[p].__fragments // first
      else if (isSecond) { $whenUsedPatch = $whenUsedPatch.concat($whenUses[p].__fragments); isSecond = false } // second
      else Array.prototype.push($whenUsedPatch, $whenUses[p].__fragments) // > second
    }
    if (!patch && !$whenUsedPatch) return r
    // concat patch and whenUses
    return {
      __fragments: [
        ...r.__fragments,
        ...$whenUsedPatch || [],
        ...patch || [],
      ]
    }
  })

  return mergeRulesetsParts(finalRulesets)
}

interface TRenderStateEx extends TRenderState {
  //eventsX?: Types.OnPressAllX
  separatedStyles?: AccumulatedStylesAndProps
}

const separateProps = (props: Types.PropsX) => {
  const { classes, className, style, $themedProps, ...rest } = props
  return { classes, className, style, $themedProps, rest: Object.keys(rest).length === 0 ? null : rest } as Types.SeparatedProps
}

const DEV_MODE = process.env.NODE_ENV === 'development'

type SeparatedPropsArray = Types.SeparatedProps[]

interface AccumulatedStylesAndProps extends Types.AccumulatedStylesFromProps {
  props: (Types.ThemedPropsX | Types.PropsX)[]
}

