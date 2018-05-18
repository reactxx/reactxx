import App1 from './pe1'
import App2 from './pe2'
import App3 from './pe3'
import App4 from './pe4'
import App5 from './pe5'
import App6 from './pe6'
import App7 from './pe7'
import App8 from './pe8'
import App9 from './pe9'

const primitives1 = {
  name: 'basic/pe1',
  title: 'HALLO WORLD with className and style',
  descr: '',
  Component: App1
} as KSink.Example

const primitives2 = {
  name: 'basic/pe2',
  title: 'Platform specific rules',
  descr: '',
  Component: App2
} as KSink.Example

const primitives3 = {
  name: 'basic/pe3',
  title: 'Inner Text is inline element',
  descr: '',
  Component: App3
} as KSink.Example

const primitives4 = {
  name: 'basic/pe4',
  title: 'Layout with Flex',
  descr: '',
  Component: App4
} as KSink.Example

const primitives5 = {
  name: 'basic/pe5',
  title: 'Vertical ScrollView',
  descr: '',
  Component: App5
} as KSink.Example

const primitives6 = {
  name: 'basic/pe6',
  title: 'Horizontal ScrollView',
  descr: '',
  Component: App6
} as KSink.Example

const primitives7 = {
  name: 'basic/pe7',
  title: 'Typography',
  descr: '',
  Component: App7
} as KSink.Example

const primitives8 = {
  name: 'basic/pe8',
  title: 'Icons',
  descr: '',
  Component: App8
} as KSink.Example

const primitives9 = {
  name: 'basic/pe9',
  title: 'Events',
  descr: '',
  Component: App9
} as KSink.Example

export const primitives: KSink.Example[] = [
  primitives1, primitives2, primitives3, primitives4, primitives5, primitives6, primitives7, primitives8, primitives9,
]
