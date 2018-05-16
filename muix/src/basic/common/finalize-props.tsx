import React from 'react'
import warning from 'warning'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { deepMerges, deepMerge, isObjectLiteral } from './to-platform'
import { TAddIn } from '../typings/add-in';
import { TCommonStyles } from 'reactxx-basic';

const DEV_MODE = process.env.NODE_ENV === 'development'

export const FinalizeProps = <TPropsX extends Types.PropsX>(options: { withCascading?: boolean; defaultProps?: Types.TDefaultProps }) => {

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = options.withCascading ? React.createContext<TPropsX>(null) : { Provider: null, Consumer: null } as React.Context<TPropsX>

  class cascadingProvider extends React.Component<TPropsX> {

    render() {
      if (options.withCascading) return <CascadingConsumer>{this.CASCADING}</CascadingConsumer>
      warning(DEV_MODE, `Component.Provider does not exist (component.name=${name}). Use 'C' variant of the component, e.g. <LabelC.Provider><LabelC>. 'C' variant of the component is created by e.g. 'LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label); export const LabelC = LabelCreator({ withCascading: true})'`) //`
      return null
    }

    CASCADING = (parentsProps: TPropsX) => {
      const { children, ...rest } = this.props as Types.PropsX & { children?: React.ReactNode }
      return <CascadingProvider value={(parentsProps && rest ? deepMerges({}, parentsProps, rest) : rest) as TPropsX}>{children}</CascadingProvider>
    }

  }

  const finalizeEvent = (props: Types.OnPressAllX, propName: TCommon.TEvents, eventCurrent) => {
    if (!props[propName]) return
    const oldProc: any = props[propName]
    if (oldProc['$wrapped']) return
    const newProc = (ev: any) => {
      ev = ev ? { ...ev } : {}
      ev.current = eventCurrent.finalCodeProps
      oldProc(ev)
    }
    newProc['$wrapped'] = true
    props[propName] = newProc
  }
  const finalizeEvents = (props: Types.OnPressAllX, eventCurrent) => {
    finalizeEvent(props, 'onPress', eventCurrent)
    finalizeEvent(props, 'onLongPress', eventCurrent)
    finalizeEvent(props, 'onPressIn', eventCurrent)
    finalizeEvent(props, 'onPressOut', eventCurrent)
  }

  const finalize = (defaultProps, cascadingProps, props, eventCurrent) => {
    // merge properties
    let finalProps = { ...props } as Types.PropsX
    if (defaultProps || cascadingProps) {
      if (typeof defaultProps === 'function') defaultProps = defaultProps(null)
      const inherited = defaultProps && cascadingProps ? deepMerges({}, defaultProps, cascadingProps) : defaultProps || cascadingProps
      if (inherited)
        for (const p in inherited) {
          const finalPropsP = finalProps[p]; const inheritedP = inherited[p]
          finalProps[p] = finalPropsP && isObjectLiteral(inheritedP) ?
            deepMerges({}, inheritedP, finalPropsP) :
            finalPropsP || inheritedP
        }
    }
    // remove developer_flag for non 'development' ENV
    if (!DEV_MODE && finalProps.developer_flag) delete finalProps.developer_flag
    // process $web and $native props part
    const { $web, $native } = finalProps
    if ($web || $native) {
      delete finalProps.$web; delete finalProps.$native
      if (window.isWeb && $web) finalProps = deepMerges({}, finalProps, $web)
      else if (!window.isWeb && $native) finalProps = deepMerges({}, finalProps, $native)
    }
    // events
    finalizeEvents(finalProps as Types.OnPressAllX, eventCurrent)
    // separate addIns props
    const addInProps: any = {}
    for (const p in finalProps) {
      if (p.startsWith('$') || p === TAddIn.addInProps.CONSTANT || p === TAddIn.addInProps.ignore || p === TAddIn.addInProps.developer_flag) {
        addInProps[p] = finalProps[p]; delete finalProps[p] // move props from finalProps to $props
      }
    }
    return { finalProps: finalProps as TPropsX, addInProps: addInProps as TAddIn.PropsX }
  }

  const finalizeProps = (input: () => { props: Types.PropsX, theme, eventCurrent }, output: (par: { finalProps: Types.PropsX, addInProps: TAddIn.PropsX }) => void, next: () => React.ReactNode) => {
    let props: Types.PropsX, defaultProps: Types.PropsX, eventCurrent
    const render = (inheritedProps: Types.PropsX) => {
      output(finalize(defaultProps, inheritedProps, props, eventCurrent))
      return next()
    }
    const res = () => {
      const inp = input()
      props = inp.props; eventCurrent = inp.eventCurrent
      defaultProps = typeof options.defaultProps === 'function' ? options.defaultProps(inp.theme) : options.defaultProps
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(finalize(defaultProps, null, props, eventCurrent))
      return next()
    }
    return res
  }

  return { finalizeProps, cascadingProvider }

}
