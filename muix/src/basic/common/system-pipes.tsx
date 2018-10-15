import React from 'react';
import * as Sheeter from 'reactxx-sheeter';
import warning from 'warning';
import { TCommon } from '../typings/common';
import { Types } from '../typings/types';
import { RenderAddIn, TRenderState } from './withStyles';
import { mergeRulesetsCreator, mergeRulesetsCreatorStr } from './merge-rulesets';
import { TCommonStyles } from '../typings/common-styles';
import { TAddIn } from '../typings/add-in';

// import { Reactxx } from 'reactxx-basic'

// DON'T REMOVE IT (project reference fails)
type fake = TAddIn.CodeProps
type fake2 = TCommonStyles.FlexStyle

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
        warning(window.__DEV__, `Component.Provider does not exist (component.name=${name}). Use 'C' variant of the component, e.g. <LabelC.Provider><LabelC>. 'C' variant of the component is created by e.g. 'LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label); export const LabelC = LabelCreator({ withCascading: true})'`) //`
        return this.props.children
      }
      return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
    }

    CASCADING = (cascadingProps: SeparatedPropsArray) => {
      const item = separateProps(this.props)
      return <CascadingProvider value={cascadingProps ? [...cascadingProps, item] : [item]}>{this.props.children}</CascadingProvider >
    }

  }

  const finalizeEvent = (platformProps: Types.CodeProps & Types.OnPressAllX, propName: TCommon.TEvents, eventsPlatform, platformName: string, renderState: TRenderStateEx) => {
    const proc: any = eventsPlatform && platformName[platformName] || platformProps[propName]
    delete platformProps[propName]; if (eventsPlatform) delete eventsPlatform[platformName]
    if (!proc || proc['$wrapped']) return
    const newProc = platformProps[platformName] = platformProps.$system[propName] = (ev: any) => {
      ev = ev && !ev.constructor ? { ...ev } : {}
      ev.current = renderState.finalProps
      proc(ev)
    }
    newProc['$wrapped'] = true
  }
  const finalizeEvents = (platformProps: Types.PropsX & Types.OnPressAllX, renderState: TRenderStateEx) => {
    const eventsPlatform = window.isWeb ? platformProps.$web : platformProps.$native
    finalizeEvent(platformProps, 'onPress', eventsPlatform, window.isWeb ? 'onClick' : 'onPress', renderState)
    finalizeEvent(platformProps, 'onPressIn', eventsPlatform, window.isWeb ? 'onMouseDown' : 'onPressIn', renderState)
    finalizeEvent(platformProps, 'onPressOut', eventsPlatform, window.isWeb ? 'onMouseUp' : 'onPressOut', renderState)
    finalizeEvent(platformProps, 'onLongPress', eventsPlatform, window.isWeb ? '?' : 'onLongPress', renderState)
  }

  const toPlatformProps = (cascadingSeparatedPropsArray: SeparatedPropsArray, currentProps: Types.PropsX, renderState: TRenderStateEx) => {

    const defaultPropsNoClasses = defaultPropsSeparated ? { ...defaultPropsSeparated, classes: null } : null

    const allSeparatedPropsArray: SeparatedPropsArray = [defaultPropsNoClasses, ...cascadingSeparatedPropsArray || [], separateProps(currentProps)]

    const theme = renderState.themeContext.theme

    // accumulate Types.StyleFromProps[] to Types.StylesFromProps
    const separatedStylesAndProps = renderState.separatedStyles = allSeparatedPropsArray.reduce<AccumulatedStylesAndProps>((prev, curr) => {
      if (!curr) return prev
      if (curr.rest) prev.props.push(curr.rest)
      if (curr.$themedProps) prev.props.push(curr.$themedProps(theme))
      if (curr.className) prev.className.push(curr.className)
      if (curr.classes) prev.classes.push(curr.classes)
      if (curr.style) prev.style.push(curr.style)
      return prev
    }, { props: [], classes: [], className: [], style: [] })

    const needsDeepMerge = separatedStylesAndProps.props.length > 1

    // merge non-style props
    const mergedProps: Types.PropsX & { $system } = needsDeepMerge ? Sheeter.deepMerges({}, separatedStylesAndProps.props) : { ...separatedStylesAndProps.props[0] }
    mergedProps.$system = { theme }
    delete separatedStylesAndProps.props

    // use sheeter utils for props finishing (linearize $web and $native props, extract addIns (e.g. $mediaq))
    const platformProps = Sheeter.finishProps(mergedProps as Sheeter.Sheet, addIns.finishAddInProps)

    // remove developer_flag for non 'development' ENV
    if (!window.__DEV__ && platformProps.$developer_flag) delete platformProps.$developer_flag

    // events
    //if (!platformProps.$system) platformProps.$system = {}
    finalizeEvents(platformProps, renderState)

    if (options.isMui && platformProps.innerRef) { // hack for materia-ui
      platformProps.ref = platformProps.innerRef
      delete platformProps.innerRef
    }

    return platformProps as Types.CodeProps //{ platformProps: platformProps as Types.CodeProps } as FinalizePropsOutput
  }

  const toPlatformStyle = (displayName: string, componentId: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderStateEx) => {

    const { platformProps, separatedStyles, getPropsPatches } = renderState
    const { theme, $cache } = renderState.themeContext

    // **** merge patches and eventsX to finalProps
    const propPatches = Sheeter.getPropsPatch(platformProps.$system as Sheeter.AddIns, getPropsPatches)
    const finalProps: Types.CodeProps = renderState.finalProps = propPatches && propPatches.length > 0 ? Sheeter.immutableMerge([platformProps, ...propPatches]) : platformProps
    const system = finalProps.$system

    // **** variant
    let variant: {} = null
    let variantCacheId: string = null

    const expandCreator = creator => {
      if (!creator) return null
      let sheet: Types.SheetX
      if (typeof creator === 'function') {
        try { sheet = creator(theme, variant) }
        catch {
          warning(theme, 'Create sheet error (maybe missing <ThemeProvider theme={}>)')
          return null
        }
      } else
        sheet = creator
      return Sheeter.toPatchableAndMergeable(sheet)
    }

    if (options && options.getVariant) {
      variant = system.variant = options.getVariant(finalProps, theme)
      variantCacheId = options.variantToString ? options.variantToString(variant) : null
    }
    const cacheId = typeof createSheetX !== 'function' ? '#static#' : !variant ? '#novariant#' : variantCacheId ? variantCacheId : null

    // **** className (and style for native).
    const toMergeClassName = [
      ...separatedStyles.className.map(creator => expandCreator(creator)),
      ...(window.isWeb ? [] : separatedStyles.style.map(creator => expandCreator(creator)))]
    if (toMergeClassName.length > 0) finalProps.className = toMergeClassName.length === 1 ? toMergeClassName[0] : Sheeter.deepMerges({}, toMergeClassName)

    // **** style (for web).
    if (window.isWeb) {
      const toMergeStylesCreators = separatedStyles.style.length > 0 ? separatedStyles.style : null
      const toMergeStylesX: Sheeter.SheetWithAddIns[] = toMergeStylesCreators ? toMergeStylesCreators.map(creator => expandCreator(creator)) : null
      if (toMergeStylesX) finalProps.style = toMergeStylesX.length === 1 ? toMergeStylesX[0] : Sheeter.deepMerges({}, toMergeStylesX)
    }

    // **** sheet (classes)
    const sheetXPatch: Sheeter.SheetWithAddIns[] = separatedStyles.classes && separatedStyles.classes.length > 0 ? separatedStyles.classes.map(creator => expandCreator(creator)) : null
    const defaultClasses: Sheeter.SheetWithAddIns = !defaultPropsSeparated ? null : expandCreator(defaultPropsSeparated.classes)

    // **** apply sheet patch to sheet:
    // call sheet creator, merges it with sheet patch
    const codeClasses = getPlatformSheet({ expandCreator, componentId, finishAddInClasses: addIns.finishAddInClasses, createSheetX, $cache: renderState.themeContext.$cache, sheetXPatch, defaultClasses, cacheId })
    if (codeClasses.$system && codeClasses.$system['$switch'])
      (renderState.getClassesPatches || (renderState.getClassesPatches = {}))['$switch'] = Sheeter.whenFlagRulesetFilter
    renderState.finalProps.classes = codeClasses
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
      output(toPlatformProps(null, { ...props }, renderState))
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

    const { finalProps, finalProps: { classes, $system }, getClassesPatches } = renderState

    if ($system.$developer_flag) {
      const { themeContext } = renderState
      console.log(
        `### withStyles RENDER CODE for ${displayName}`,
        '\nfinalProps: ', finalProps,
      )
    }

    // method, called in component code: ruleset merging
    $system.classNames = mergeRulesetsCreator(classes as Sheeter.SheetWithAddIns, getClassesPatches)
    $system.classNamesStr = mergeRulesetsCreatorStr(classes as Sheeter.SheetWithAddIns, getClassesPatches) //, addIns.rulesetsToClassNames);
    // $system.classNamesAny = (component, ...rulesets) => typeof component === 'string' ? $system.classNamesStr(...rulesets) : $system.classNames(...rulesets)
    //$system.classNamesStr = mergeRulesetsCreator(classes as Sheeter.SheetWithAddIns, getClassesPatches)
    //$system.classNamesAny = (component, ...rulesets) => $system.classNames(...rulesets)

    // call component code
    return <CodeComponent {...finalProps as Types.CodeProps<R>} />
  }

  return { propsPipe, stylePipe, renderComponentPipe, cascadingProvider: CascadingProviderComponent as any as React.ComponentClass<Types.PropsX<R>> }

}

//****************************
// GET PLATFORM SHEET
//****************************

const getPlatformSheet = (par: GetPlatformSheetPar) => {
  const { componentId, expandCreator, createSheetX, defaultClasses, sheetXPatch, cacheId, $cache } = par
  // final sheet is merged from sheet, defaultClasses, component.provider cascading props and component props (classes, className and (for native only) style)
  // sheet and defaultClasses could be cached
  if (cacheId) {
    // from theme cache (sheet and defaultClasses included in cache)
    const cache = fromCache($cache, componentId, cacheId, () => Sheeter.mergeSheets(expandCreator(createSheetX), defaultClasses ? [defaultClasses] : null, true))
    return Sheeter.mergeSheetsAndFinish(cache, sheetXPatch, par.finishAddInClasses, false)
  } else {
    // without cache ( including sheet and defaultClasses)
    const patch = sheetXPatch && defaultClasses ? [defaultClasses, ...sheetXPatch] : sheetXPatch ? sheetXPatch : defaultClasses ? [defaultClasses] : null
    return Sheeter.mergeSheetsAndFinish(expandCreator(createSheetX), patch, par.finishAddInClasses, true)
  }
}

const fromCache = ($cache: Cache, componentId: number, cacheId: string, getter: () => Sheeter.SheetWithAddIns) => {
  let compCache = $cache[componentId]
  if (!compCache) $cache[componentId] = compCache = {}
  return compCache[cacheId] || (compCache[cacheId] = getter())
}

type Cache = { [variantId: string]: Sheeter.SheetWithAddIns }[]

interface GetPlatformSheetPar {
  componentId: number
  createSheetX: Types.SheetCreatorX
  expandCreator: (creator: Types.SheetCreatorX) => Sheeter.SheetWithAddIns
  $cache: Cache
  sheetXPatch: Sheeter.SheetWithAddIns[]
  defaultClasses?: Sheeter.SheetWithAddIns
  cacheId: string
  finishAddInClasses: Sheeter.FinishAddIns
}

export const hasPlatformEvents = (cpx: Types.CodeProps) => window.isWeb ? cpx.onClick || cpx.onMouseUp || cpx.onMouseDown : cpx.onPress || cpx.onPressIn || cpx.onPressOut || cpx.onLongPress

/************************
* PRIVATE
*************************/

interface TRenderStateEx extends TRenderState {
  separatedStyles?: AccumulatedStylesAndProps
}

const separateProps = (props: Types.PropsX) => {
  const { classes, className, style, $themedProps, ...rest } = props
  return { classes, className, style, $themedProps, rest: Object.keys(rest).length === 0 ? null : rest } as Types.SeparatedProps
}

type SeparatedPropsArray = Types.SeparatedProps[]

interface AccumulatedStylesAndProps extends Types.AccumulatedStylesFromProps {
  props: (Types.ThemedPropsX | Types.PropsX)[]
}

