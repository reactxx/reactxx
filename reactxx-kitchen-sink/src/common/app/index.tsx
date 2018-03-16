import * as React from 'react'

import { meta as navigation } from './navigation'
import { meta as responsibleDrawer } from '../responsible-drawer/responsible-drawer'
import * as prims from '../primitives/index'

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

export let navigationExample: KSink.Example

export const primitives: KSink.Example[] = [
  prims.primitives1, prims.primitives2, prims.primitives3, prims.primitives4, prims.primitives5, prims.primitives6, prims.primitives7,
]

export const components: KSink.Example[] = [
  responsibleDrawer,
]

export const examples: KSink.Example[] = [
  navigationExample = navigation,
  ...components,
  ...primitives
]

export const nameToExample = (name: string) => examples.find(e => e.name===name) || navigationExample
export const exampleToElement = (ex: KSink.Example) => (<ex.Component />)

const RootApp: React.SFC = props => {
  const name = (window.location ? window.location.pathname : null) as string
  const example = nameToExample(name)
  return exampleToElement(example)
};

export default RootApp
