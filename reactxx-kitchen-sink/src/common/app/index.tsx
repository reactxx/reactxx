import React from 'react'

import NavigApp from './navigation'
import { primitives } from '../primitives/index'
import { component } from '../component/index'
import * as comps from '../components/index'

export namespace KSink {

  //export const Consts = {
  //  navigationName: 'app/navigation',
  //}

  export interface Example {
    name: string
    title: string
    Component: React.ComponentType
    descr?: string
  }

}

export const navigationExample = {
  name: 'app/navigation',
  title: 'Home',
  descr: '',
  Component: NavigApp as any,
} as KSink.Example

export const components: KSink.Example[] = [
  comps.responsibleDrawer,
]

export const examples: KSink.Example[] = [
  navigationExample,
  ...components,
  ...primitives,
  ...component
]

export const nameToExample = (name: string) => examples.find(e => e.name===name) || navigationExample
export const exampleToElement = (ex: KSink.Example) => (<ex.Component />)

const RootApp: React.SFC = props => {
  const name = (window.location ? window.location.pathname : null) as string
  const example = nameToExample(name)
  return exampleToElement(example)
};

export default RootApp
