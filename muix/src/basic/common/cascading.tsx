import React from 'react'
import warning from 'warning'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { deepMerges, deepMerge } from './to-platform'

const DEV_MODE = process.env.NODE_ENV === 'development'

export const Cascading = <TPropsX extends Types.PropsX, TOptions extends Types.WithStyleOptions_ComponentX>(options: TOptions) => {

  const { Provider: CascadingProvider, Consumer: CascadingConsumer } = options.withCascading ? React.createContext<TPropsX>(null) : { Provider: null, Consumer: null } as React.Context<TPropsX>

  class provider extends React.Component<TPropsX> {

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

  const resolveDefaultProps = (defaultProps, cascadingProps, props) => {
    if (!defaultProps && !cascadingProps) return props
    const modifier = defaultProps && cascadingProps ? deepMerges({}, defaultProps, cascadingProps) : (defaultProps ? defaultProps : cascadingProps)
    const canChangeModifier = defaultProps && cascadingProps //modifier is deepMerged => can change it
    const res = { ...props }
    for (const p in modifier) {
      const modp = modifier[p]
      const propsp = props[p]
      if (propsp && typeof modp === 'object') res[p] = canChangeModifier ? deepMerge(modp, propsp) : deepMerges({}, modp, propsp)
      else res[p] = modifier[p]
    }
    return res
  }

  const cascading = (input: () => TPropsX, output: (outputPar: TPropsX) => void, next: () => React.ReactNode) => {
    let componentProps: TPropsX
    const render = (inheritedProps: TPropsX) => {
      output(resolveDefaultProps(options.defaultProps, inheritedProps, componentProps))
      return next()
    }
    const res = () => {
      componentProps = input()
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(resolveDefaultProps(options.defaultProps, null, componentProps))
      return next()
    }
    return res
  }

  return { cascading, provider }

}
