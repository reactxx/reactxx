import App1 from './me1'
import App2 from './me2'
import App3 from './me3'

const mediaq1 = {
  name: 'mediaq/me1',
  title: 'Media query rules',
  descr: '',
  Component: App1
} as KSink.Example

const mediaq2 = {
  name: 'mediaq/me2',
  title: 'Media query flags',
  descr: '',
  Component: App2
} as KSink.Example

const mediaq3 = {
  name: 'mediaq/me3',
  title: 'With theme',
  descr: '',
  Component: App3
} as KSink.Example

export const mediaqs: KSink.Example[] = [
  mediaq1, mediaq2, mediaq3
]
