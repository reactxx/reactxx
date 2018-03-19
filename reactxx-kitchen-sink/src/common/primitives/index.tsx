import App1 from './e1'
import App2 from './e2'
import App3 from './e3'
import App4 from './e4'
import App5 from './e5'
import App6 from './e6'
import App7 from './e7'
import App8 from './e8'

const primitives1 = {
  name: 'primitives/e1',
  title: 'HALLO WORLD with className and style',
  descr: '',
  Component: App1
} as KSink.Example

const primitives2 = {
  name: 'primitives/e2',
  title: 'Platform specific rules',
  descr: '',
  Component: App2
} as KSink.Example

const primitives3 = {
  name: 'primitives/e3',
  title: 'Inner Text is inline element',
  descr: '',
  Component: App3
} as KSink.Example

const primitives4 = {
  name: 'primitives/e4',
  title: 'Layout with Flex',
  descr: '',
  Component: App4
} as KSink.Example

const primitives5 = {
  name: 'primitives/e5',
  title: 'Vertical ScrollView',
  descr: '',
  Component: App5
} as KSink.Example

const primitives6 = {
  name: 'primitives/e6',
  title: 'Horizontal ScrollView',
  descr: '',
  Component: App6
} as KSink.Example

const primitives7 = {
  name: 'primitives/e7',
  title: 'Media query',
  descr: '',
  Component: App7
} as KSink.Example

const primitives8 = {
  name: 'primitives/e8',
  title: 'Typography',
  descr: '',
  Component: App8
} as KSink.Example

export const primitives: KSink.Example[] = [
  primitives1, primitives2, primitives3, primitives4, primitives5, primitives6, primitives7, primitives8,
]
