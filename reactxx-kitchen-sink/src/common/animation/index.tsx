import App1 from './ae1'
import App2 from './ae2'

const animation1 = {
  name: 'animation/ae1',
  title: '',
  descr: '',
  Component: App1
} as KSink.Example

const animation2 = {
  name: 'animation/ae2',
  title: '',
  descr: '',
  Component: App2
} as KSink.Example

export const animations: KSink.Example[] = [
  animation1, animation2
]
