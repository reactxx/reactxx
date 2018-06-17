import React from 'react'
import warning from 'warning'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { deepMerges, deepMerge, toPlatformRulesets } from './to-platform'
import { TAddIn } from '../typings/add-in'
import { TCommonStyles } from '../typings/common-styles'
import { themePipe } from './theme'
import { TRenderState } from './withStyles'
import { getPlatformSheet } from './sheet-cache'

export interface FinalizePropsOutput {
  platformProps: Types.CodeProps
  addInProps: TAddIn.PropsX
  //accumulatedStylesFromProps: Types.AccumulatedStylesFromProps
  //eventsX: Types.OnPressAllX
}

export const CreateToPlatformContext = <R extends Types.Shape>(id:number, displayName: string, sheetCreator: Types.SheetCreatorX<R>, options: Types.WithStyleOptions_ComponentX<R>) => {

  let styleFromDefaultProps: Types.StyleFromProps = null
  let classesFromDefaultProps: Types.PartialSheetCreatorX = null
  const eventsX: Types.OnPressAllX = {}
  let accumulatedStylesFromProps: AccumulatedStylesAndProps

  if (options.defaultProps) {
    const { $themedProps, classes, rest } = getStyleFromProps(options.defaultProps)
    styleFromDefaultProps = { $themedProps, rest }
    classesFromDefaultProps = classes
  }

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = options.withCascading ? React.createContext<StyleFromPropsArray>(null) : { Provider: null, Consumer: null } as React.Context<StyleFromPropsArray>

  class CascadingProviderComponent extends React.Component<Types.PropsX> {

    render() {
      if (!options.withCascading) {
        warning(DEV_MODE, `Component.Provider does not exist (component.name=${name}). Use 'C' variant of the component, e.g. <LabelC.Provider><LabelC>. 'C' variant of the component is created by e.g. 'LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label); export const LabelC = LabelCreator({ withCascading: true})'`) //`
        return this.props.children
      }
      return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
    }

    CASCADING = (cascadingProps: StyleFromPropsArray) => {
      const item = getStyleFromProps(this.props)
      return <CascadingProvider value={cascadingProps ? [...cascadingProps, item] : [item]}>{this.props.children}</CascadingProvider >
    }

  }

  const finalizeEvent = (finalProps: Types.OnPressAllX, propName: TCommon.TEvents, eventsPlatform, platformName: string, renderState: TRenderState) => {
    const proc: any = eventsPlatform && platformName[platformName] || finalProps[propName]
    if (!proc || proc['$wrapped']) return
    delete finalProps[propName]; if (eventsPlatform) delete eventsPlatform[platformName]
    const newProc = finalProps[platformName] = eventsX[propName] = (ev: any) => {
      ev = ev && !ev.constructor ? { ...ev } : {}
      ev.current = renderState.platformProps
      proc(ev)
    }
    newProc['$wrapped'] = true
  }
  const finalizeEvents = (finalProps: Types.PropsX & Types.OnPressAllX, renderState: TRenderState) => {
    const eventsPlatform = window.isWeb ? finalProps.$web : finalProps.$native
    finalizeEvent(finalProps, 'onPress', eventsPlatform, window.isWeb ? 'onClick' : 'onPress', renderState)
    finalizeEvent(finalProps, 'onPressIn', eventsPlatform, window.isWeb ? 'onMouseDown' : 'onPressIn', renderState)
    finalizeEvent(finalProps, 'onPressOut', eventsPlatform, window.isWeb ? 'onMouseUp' : 'onPressOut', renderState)
    finalizeEvent(finalProps, 'onLongPress', eventsPlatform, window.isWeb ? '?' : 'onLongPress', renderState)
  }

  const toPlatformProps = (cascadingStyleFromPropsArray: StyleFromPropsArray, currentProps: Types.PropsX, renderState: TRenderState) => {

    const allStyleFromPropsArray: StyleFromPropsArray = [styleFromDefaultProps || null, ...cascadingStyleFromPropsArray || [], getStyleFromProps(currentProps)]

    const theme = renderState.themeContext.theme

    // accumulate Types.StyleFromProps[] to Types.StylesFromProps
    accumulatedStylesFromProps = allStyleFromPropsArray.reduce<AccumulatedStylesAndProps>((prev, curr) => {
      if (!curr) return prev
      if (curr.rest) prev.props.push(curr.rest)
      if (curr.$themedProps) prev.props.push(curr.$themedProps(theme))
      if (curr.className) prev.className.push(curr.className)
      if (curr.classes) prev.classes.push(curr.classes)
      if (curr.style) prev.style.push(curr.style)
      return prev
    }, { props: [], classes: [], className: [], style: [] })

    const needsDeepMerge = accumulatedStylesFromProps.props.length > 1

    // merge non-style props
    let platformProps: Types.PropsX = needsDeepMerge ? deepMerges({}, ...accumulatedStylesFromProps.props) : { ...accumulatedStylesFromProps.props[0] }
    delete accumulatedStylesFromProps.props

    // remove developer_flag for non 'development' ENV
    if (!DEV_MODE && platformProps.$developer_flag) delete platformProps.$developer_flag

    // events
    finalizeEvents(platformProps, renderState)

    // process $web and $native props part
    const { $web, $native } = platformProps
    delete platformProps.$web; delete platformProps.$native
    if ($web && window.isWeb) platformProps = needsDeepMerge ? deepMerges(platformProps, $web) : deepMerges({}, platformProps, $web)
    if ($native && !window.isWeb) platformProps = needsDeepMerge ? deepMerges(platformProps, $native) : deepMerges({}, platformProps, $native)

    // separate addIns props (starting with $)
    const addInProps: any = {}
    for (const p in platformProps) {
      if (p.startsWith('$')) {
        addInProps[p] = platformProps[p]; delete platformProps[p] // move props from platformProps to addInProps, e.g. $developer_flag:true, $mediaq: {'-640': {}}
      }
    }

    return { platformProps: platformProps as Types.CodeProps, addInProps } as FinalizePropsOutput
  }

  const toPlatformStyle = (displayName: string, id: number, createSheetX: Types.SheetCreatorX, options: Types.WithStyleOptions_ComponentX, renderState: TRenderState) => {

    const { codeSystemPropsPatch, platformProps, addInProps } = renderState
    const { theme, $cache } = renderState.themeContext

    // **** codeSystemProps
    const codeSystemProps = renderState.platformProps.system = { ...eventsX || null } as Types.CodeSystemProps
    //if (eventsX) Object.assign(codeSystemProps, eventsX)
    for (const p in codeSystemPropsPatch) Object.assign(codeSystemProps, codeSystemPropsPatch[p])

    // **** variant
    let variant: {} = null
    let variantCacheId: string = null
    const expandCreator = creator => typeof creator === 'function' ? creator(theme, variant) : creator

    if (options && options.getVariant) {
      variant = options.getVariant(renderState.platformProps, theme)
      variantCacheId = options.variantToString ? options.variantToString(variant) : null
    }
    codeSystemProps.variant = variant

    // **** style (for web only). For native: is included in sheetXPatch.root.
    const toMergeStylesCreators = window.isWeb && accumulatedStylesFromProps.style.length > 0 ? accumulatedStylesFromProps.style : null
    const toMergeStylesX: Types.RulesetX[] = !toMergeStylesCreators ? null : toMergeStylesCreators.map(creator => expandCreator(creator))

    if (toMergeStylesX) codeSystemProps.style = toPlatformRulesets(toMergeStylesX)

    // **** sheet patch (for native: style included)
    const toMergeSheetCreators = [...accumulatedStylesFromProps.classes || null, ...accumulatedStylesFromProps.className.map(className => ({ root: className })), ... (window.isWeb ? [] : accumulatedStylesFromProps.style.map(style => ({ root: style })))]
    const sheetXPatch: Types.PartialSheetX[] = toMergeSheetCreators.length === 0 ? null : toMergeSheetCreators.map(creator => expandCreator(creator))
    const defaultClasses: Types.PartialSheetX = typeof classesFromDefaultProps === 'function' ? expandCreator(classesFromDefaultProps) : classesFromDefaultProps

    // **** apply sheet patch to sheet:
    // call sheet creator, merges it with sheet patch, process RulesetX.$web & $native & $before & $after, extract addIns
    const { sheet, addIns } = getPlatformSheet({ id, createSheetX, themeContext: renderState.themeContext, sheetXPatch, defaultClasses, variant, variantCacheId })
    renderState.addInClasses = addIns //e.g {$animations:..., root: {$mediaq:...}}
    renderState.codeClasses = sheet
  }

  const propsPipe = (input: () => { props: Types.PropsX, renderState: TRenderState }, output: (par: FinalizePropsOutput) => void, next: () => React.ReactNode) => {
    let props: Types.PropsX, renderState: TRenderState
    const render = (cascadingStyleFromPropsArray: StyleFromPropsArray) => {
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
    const { platformProps, codeClassesPatch, codeClasses, addInProps } = renderState

    if (addInProps.$developer_flag) {
      const { themeContext, codeSystemPropsPatch } = renderState
      console.log(
        `### withStyles RENDER CODE for ${displayName}`,
        '\nplatformProps: ', platformProps,
        '\naddInProps: ', addInProps,
        '\ntheme: ', themeContext.theme,
        '\npropsPatch: ', codeSystemPropsPatch,
        '\ncodeClasses: ', codeClasses,
        '\ncodeClassesPatch: ', codeClassesPatch,
      )
    }

    // apply patches
    let classes = codeClasses
    if (codeClassesPatch.length > 0) classes = deepMerges({}, codeClasses, ...codeClassesPatch)

    platformProps.system.classes = classes

    // call component code
    return <CodeComponent {...renderState.platformProps as Types.CodeProps<R>} />
  }


  return { propsPipe, stylePipe, renderComponentPipe, cascadingProvider: CascadingProviderComponent as any as React.ComponentClass<Types.PropsX<R>> }

}

/************************
* PRIVATE
*************************/

const getStyleFromProps = (props: Types.PropsX) => {
  const { classes, className, style, $themedProps, ...rest } = props
  return { classes, className, style, $themedProps, rest: Object.keys(rest).length === 0 ? null : rest } as Types.StyleFromProps
}

const DEV_MODE = process.env.NODE_ENV === 'development'

type StyleFromPropsArray = Types.StyleFromProps[]

interface AccumulatedStylesAndProps extends Types.AccumulatedStylesFromProps {
  props: (Types.ThemedPropsX | Types.PropsX)[]
}

