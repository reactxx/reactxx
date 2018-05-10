import React from 'react'
import warning from 'warning'

import { Types } from '../typings/types'
import { TCommon } from '../typings/common'
import { deepMerges, deepMerge, isObjectLiteral } from './to-platform'
import { TAddIn } from '../typings/add-in';

const DEV_MODE = process.env.NODE_ENV === 'development'

export const Cascading = <TPropsX extends Types.PropsX>(options: { withCascading?: boolean; defaultProps?: Types.PropsXOverwrite }) => {

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

  const $extract = (props) => {

  }
  const finalizeProps = (defaultProps, cascadingProps, props) => {
    const finalProps = { ...props }
    if (defaultProps || cascadingProps) {
      const modifier = defaultProps && cascadingProps ? deepMerges({}, defaultProps, cascadingProps) : (defaultProps ? defaultProps : cascadingProps)
      for (const p in modifier) {
        const finalPropsP = finalProps[p]
        const modifierP = modifier[p]
        finalProps[p] = isObjectLiteral(modifierP) && finalPropsP ? deepMerges({}, finalPropsP, modifierP) : modifierP
      }
    }
    const $props: any = {}
    for (const p in finalProps) {
      if (p.startsWith('$') || p === TAddIn.addInProps.CONSTANT || p === TAddIn.addInProps.ignore) {
        $props[p] = finalProps[p]
        delete finalProps[p] // modify finalProps
        continue
      }
    }
    return { finalProps: finalProps as TPropsX, $props: $props as TAddIn.PropX }
    //const modifier = defaultProps && cascadingProps ? deepMerges({}, defaultProps, cascadingProps) : (defaultProps ? defaultProps : cascadingProps)
    //const canChangeModifier = defaultProps && cascadingProps //modifier is deepMerged => can change it
    //const res = { ...props }
    //for (const p in modifier) {
    //  if (p.startsWith('$')) continue
    //  const modp = modifier[p]
    //  const propsp = props[p]
    //  if (propsp && typeof modp === 'object') res[p] = canChangeModifier ? deepMerge(modp, propsp) : deepMerges({}, modp, propsp)
    //  else res[p] = modifier[p]
    //}
    //return res
  }

  const cascading = (input: () => TPropsX, output: (par: { finalProps: TPropsX, $props: TAddIn.PropX }) => void, next: () => React.ReactNode) => {
    let props: TPropsX
    const render = (inheritedProps: TPropsX) => {
      output(finalizeProps(options.defaultProps, inheritedProps, props))
      return next()
    }
    const res = () => {
      props = input()
      if (options.withCascading) return <CascadingConsumer>{render}</CascadingConsumer>
      output(finalizeProps(options.defaultProps, null, props))
      return next()
    }
    return res
  }

  return { cascading, provider }

}
