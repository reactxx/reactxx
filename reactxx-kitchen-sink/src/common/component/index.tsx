import App1 from './e1'
import App2 from './e2'

const comp1 = {
  name: 'component/e1',
  title: 'Basic component',
  descr: '',
  Component: App1
} as KSink.Example

const comp2 = {
  name: 'component/e2',
  title: 'Media queries',
  descr: '',
  Component: App2
} as KSink.Example

export const component: KSink.Example[] = [
  comp1,
  comp2,
]
