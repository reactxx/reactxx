import React from 'react'
import warning from 'warning'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { deepMerges, deepMerge, isObjectLiteral } from './to-platform'
import { TAddIn } from '../typings/add-in'
import { TCommonStyles } from 'reactxx-basic'
import { theme } from './theme'

const DEV_MODE = process.env.NODE_ENV === 'development'

interface ProviderProps {
  cascadingItems?: Types.CascadingProp[]
}

interface CascadingStyles extends Types.CascadingStyles {
  props: (Types.ThemedPropsX | Types.PropsX)[]
}


export const getCascadingItem = (props: Types.PropsX) => {
  const { classes, className, style, $themedProps, ...rest } = props
  return { classes, className, style, $themedProps, rest: Object.keys(rest).length === 0 ? null : rest } as Types.CascadingProp
}

export const FinalizeProps = <R extends Types.Shape>(options?: Types.WithStyleOptions_ComponentX<R>) => {

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = options.withCascading ? React.createContext<ProviderProps>(null) : { Provider: null, Consumer: null } as React.Context<ProviderProps>

  class CascadingProviderComponent extends React.Component<Types.PropsX> {

    render() {
      if (!options.withCascading) {
        warning(DEV_MODE, `Component.Provider does not exist (component.name=${name}). Use 'C' variant of the component, e.g. <LabelC.Provider><LabelC>. 'C' variant of the component is created by e.g. 'LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label); export const LabelC = LabelCreator({ withCascading: true})'`) //`
        return this.props.children
      }
      return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
    }

    CASCADING = (cascadingProps: ProviderProps) => {
      const item = getCascadingItem(this.props)
      return <CascadingProvider value={{ cascadingItems: cascadingProps ? [...cascadingProps.cascadingItems, item] : [item] }}>{this.props.children}</CascadingProvider >
    }

  }

  const finalizeEvent = (props: Types.OnPressAllX, propName: TCommon.TEvents, renderState) => {
    const proc: any = props[propName]
    if (!proc || proc['$wrapped']) return
    const newProc = props[propName] = (ev: any) => {
      ev = ev ? { ...ev } : {}
      ev.current = renderState.finalCodeProps
      proc(ev)
    }
    newProc['$wrapped'] = true
  }
  const finalizeEvents = (props: Types.OnPressAllX, renderState) => {
    finalizeEvent(props, 'onPress', renderState)
    finalizeEvent(props, 'onLongPress', renderState)
    finalizeEvent(props, 'onPressIn', renderState)
    finalizeEvent(props, 'onPressOut', renderState)
  }

  const finalize = (theme, defaultProps: Types.CascadingProp, cascadingProps: ProviderProps, props: Types.PropsX, renderState) => {

    const items = [defaultProps, ...(cascadingProps ? cascadingProps.cascadingItems : null), getCascadingItem(props)]

    const cascadingStyles = items.reduce<CascadingStyles>((prev, curr) => {
      if (!curr) return prev
      if (curr.rest) prev.props.push(curr.rest)
      if (curr.$themedProps) prev.props.push(curr.$themedProps(theme))
      if (curr.className) prev.className.push(curr.className)
      if (curr.classes) prev.classes.push(curr.classes)
      if (curr.style) prev.style.push(curr.style)
      return prev
    }, { props: [], classes: [], className: [], style: [] })

    const needsDeepMerge = cascadingStyles.props.length > 1

    props = needsDeepMerge ? deepMerges({}, ...cascadingStyles.props) : { ...cascadingStyles.props[0] }
    delete cascadingStyles.props

    // remove developer_flag for non 'development' ENV
    if (!DEV_MODE && props.$developer_flag) delete props.$developer_flag

    // process $web and $native props part
    const { $web, $native } = props
    if ($web) {
      delete props.$web
      if (window.isWeb) props = needsDeepMerge ? deepMerges(props, $web) : deepMerges({}, props, $web)
    } else if ($native) {
      delete props.$native
      if (!window.isWeb) props = needsDeepMerge ? deepMerges(props, $native) : deepMerges({}, props, $native)
    }

    // events
    finalizeEvents(props as Types.OnPressAllX, renderState)

    // separate addIns props (starting with $)
    const addInProps: any = {}
    for (const p in props) {
      if (p.startsWith('$')) {
        addInProps[p] = props[p]; delete props[p] // move props from finalProps to addInProps, e.g. $mediaq: {'-640': {}}
      }
    }

    return { finalProps: props as Types.PropsX, addInProps, cascadingStyles }
  }

  interface FinalizePropsOutput {
    finalProps: Types.PropsX
    addInProps: TAddIn.PropsX
    cascadingStyles: Types.CascadingStyles
  }

  const finalizeProps = (input: () => { props: Types.PropsX, theme, renderState }, output: (par: FinalizePropsOutput) => void, next: () => React.ReactNode) => {
    let props: Types.PropsX, theme, renderState
    const render = (cascadingProps: ProviderProps) => {
      output(finalize(theme, options.defaultPropsAsCascading, cascadingProps, props, renderState))
      return next()
    }
    const res = () => {
      const inp = input()
      props = inp.props; renderState = inp.renderState; theme = inp.theme
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(finalize(theme, options.defaultPropsAsCascading, null, props, renderState))
      return next()
    }
    return res
  }

  return { finalizeProps, cascadingProvider: CascadingProviderComponent as any as React.ComponentClass<Types.PropsX<R>> }

}
