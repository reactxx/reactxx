import App1 from './me1'
import App2 from './me2'

const mediaq1 = {
  name: 'mediaq/me1',
  title: 'MediaQ 1',
  descr: '',
  Component: App1
} as KSink.Example

const mediaq2 = {
  name: 'mediaq/me2',
  title: 'MediaQ 2',
  descr: '',
  Component: App2
} as KSink.Example

export const mediaqs: KSink.Example[] = [
  mediaq1, mediaq2
]
