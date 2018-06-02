import React from 'react'
import warning from 'warning'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { deepMerges, deepMerge, isObjectLiteral } from './to-platform'
import { TAddIn } from '../typings/add-in'
import { TCommonStyles } from 'reactxx-basic'
import { theme } from './theme'

const DEV_MODE = process.env.NODE_ENV === 'development'

type StyleFromPropsArray = Types.StyleFromProps[]

interface AccumulatedStylesAndProps extends Types.AccumulatedStylesFromProps {
  props: (Types.ThemedPropsX | Types.PropsX)[]
}

export interface FinalizePropsOutput {
  finalProps: Types.PropsX
  addInProps: TAddIn.PropsX
  accumulatedStylesFromProps: Types.AccumulatedStylesFromProps
  eventsX: Types.OnPressAllX
}

export const getStyleFromProps = (props: Types.PropsX) => {
  const { classes, className, style, $themedProps, ...rest } = props
  return { classes, className, style, $themedProps, rest: Object.keys(rest).length === 0 ? null : rest } as Types.StyleFromProps
}

export const FinalizeProps = <R extends Types.Shape>(options?: Types.WithStyleOptions_ComponentX<R>) => {

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

  const finalizeEvent = (finalProps: Types.OnPressAllX, propName: TCommon.TEvents, eventsPlatform, platformName: string, eventsX: Types.OnPressAllX, renderState) => {
    const proc: any = eventsPlatform && platformName[platformName] || finalProps[propName]
    if (!proc || proc['$wrapped']) return
    delete proc[propName]; if (eventsPlatform) delete eventsPlatform[platformName]
    const newProc = finalProps[platformName] = eventsX[propName] = (ev: any) => {
      ev = ev ? { ...ev } : {}
      ev.current = renderState.finalCodeProps
      proc(ev)
    }
    newProc['$wrapped'] = true
  }
  const finalizeEvents = (finalProps: Types.PropsX & Types.OnPressAllX, eventsX: Types.OnPressAllX, renderState) => {
    const eventsPlatform = window.isWeb ? finalProps.$web : finalProps.$native
    finalizeEvent(finalProps, 'onPress', eventsPlatform, window.isWeb ? 'onClick' : 'onPress', eventsX, renderState)
    finalizeEvent(finalProps, 'onPressIn', eventsPlatform, window.isWeb ? 'onMouseDown' : 'onPressIn', eventsX, renderState)
    finalizeEvent(finalProps, 'onPressOut', eventsPlatform, window.isWeb ? 'onMouseUp' : 'onPressOut', eventsX, renderState)
    finalizeEvent(finalProps, 'onLongPress', eventsPlatform, window.isWeb ? '?' : 'onLongPress', eventsX, renderState)
  }

  const finalize = (theme, _defaultPropsAsStyleFromProps: Types.StyleFromProps, cascadingStyleFromPropsArray: StyleFromPropsArray, currentProps: Types.PropsX, renderState) => {

    const allStyleFromPropsArray: StyleFromPropsArray = [_defaultPropsAsStyleFromProps, ...cascadingStyleFromPropsArray || null, getStyleFromProps(currentProps)]

    // accumulate Types.StyleFromProps[] to Types.StylesFromProps
    const accumulatedStylesAndProps = allStyleFromPropsArray.reduce<AccumulatedStylesAndProps>((prev, curr) => {
      if (!curr) return prev
      if (curr.rest) prev.props.push(curr.rest)
      if (curr.$themedProps) prev.props.push(curr.$themedProps(theme))
      if (curr.className) prev.className.push(curr.className)
      if (curr.classes) prev.classes.push(curr.classes)
      if (curr.style) prev.style.push(curr.style)
      return prev
    }, { props: [], classes: [], className: [], style: [] })

    const needsDeepMerge = accumulatedStylesAndProps.props.length > 1

    // merge non-style props
    let finalProps: Types.PropsX = needsDeepMerge ? deepMerges({}, ...accumulatedStylesAndProps.props) : { ...accumulatedStylesAndProps.props[0] }
    delete accumulatedStylesAndProps.props

    // remove developer_flag for non 'development' ENV
    if (!DEV_MODE && finalProps.$developer_flag) delete finalProps.$developer_flag

    // events
    const eventsX: Types.OnPressAllX = {}
    finalizeEvents(finalProps, eventsX, renderState)

    // process $web and $native props part
    const { $web, $native } = finalProps
    delete finalProps.$web; delete finalProps.$native
    if ($web && window.isWeb) finalProps = needsDeepMerge ? deepMerges(finalProps, $web) : deepMerges({}, finalProps, $web)
    if ($native && !window.isWeb) finalProps = needsDeepMerge ? deepMerges(finalProps, $native) : deepMerges({}, finalProps, $native)

    // separate addIns props (starting with $)
    const addInProps: any = {}
    for (const p in finalProps) {
      if (p.startsWith('$')) {
        addInProps[p] = finalProps[p]; delete finalProps[p] // move props from finalProps to addInProps, e.g. for $mediaq: {'-640': {}}
      }
    }

    return { finalProps, addInProps, accumulatedStylesFromProps: accumulatedStylesAndProps, eventsX } as FinalizePropsOutput
  }

  const finalizeProps = (input: () => { props: Types.PropsX, theme, renderState }, output: (par: FinalizePropsOutput) => void, next: () => React.ReactNode) => {
    let props: Types.PropsX, theme, renderState
    const render = (cascadingStyleFromPropsArray: StyleFromPropsArray) => {
      output(finalize(theme, options._defaultPropsAsStyleFromProps, cascadingStyleFromPropsArray, props, renderState))
      return next()
    }
    const res = () => {
      const inp = input()
      props = inp.props; renderState = inp.renderState; theme = inp.theme
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(finalize(theme, options._defaultPropsAsStyleFromProps, null, props, renderState))
      return next()
    }
    return res
  }

  return { finalizeProps, cascadingProvider: CascadingProviderComponent as any as React.ComponentClass<Types.PropsX<R>> }

}
