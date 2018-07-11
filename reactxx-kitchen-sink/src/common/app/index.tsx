import React from 'react'

import NavigApp from './navigation'
import { primitives } from '../basic'
import { component } from '../component'
import { mediaqs } from '../mediaq'
import { animations } from '../animation'

import * as comps from '../components'
import { AppContainer } from 'reactxx'

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
  ...component,
  ...mediaqs,
  ...animations,
]

export const nameToExample = (name: string) => examples.find(e => e.name===name) || navigationExample
export const exampleToElement = (ex: KSink.Example) => (<ex.Component />)

const RootApp: React.SFC = props => {
  const name = (window.location ? window.location.pathname : null) as string
  const example = nameToExample(name)
  return <AppContainer>{exampleToElement(example)}</AppContainer>
};

export default RootApp
