import App1 from './ce1'
import App2 from './ce2'

const comp1 = {
  name: 'component/ce1',
  title: 'Basic',
  descr: '',
  Component: App1
} as KSink.Example

const comp2 = {
  name: 'component/ce2',
  title: 'Theming',
  descr: '',
  Component: App2
} as KSink.Example

export const component: KSink.Example[] = [
  comp1,
  comp2,
]
