import React from 'react'

import { meta as navigation } from './navigation'
import { meta as responsibleDrawer } from '../responsible-drawer/responsible-drawer'
import { meta as primitives1 } from '../primitives/e1'
import { meta as primitives2 } from '../primitives/e2'
import { meta as primitives3 } from '../primitives/e3'
import { meta as primitives4 } from '../primitives/e4'
import { meta as primitives5 } from '../primitives/e5'
import { meta as primitives6 } from '../primitives/e6'
import { meta as primitives7 } from '../primitives/e7'

let navigationExample: KSink.Example

export const examples: KSink.Example[] = [
  navigationExample = navigation,
  responsibleDrawer,
  primitives1, primitives2, primitives3, primitives4, primitives5, primitives6, primitives7,
]

export const nameToExample = (name: string) => name ? (examples[name] || navigationExample) : navigationExample
export const exampleToElement = (ex: KSink.Example) => (<ex.Component />)

const RootApp: React.SFC = props => {
  const name = (window.location ? window.location.pathname : null) as string
  const example = nameToExample(name)
  return exampleToElement(example)
};

export default RootApp
