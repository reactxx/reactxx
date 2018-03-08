# reactxx-stateman

Propagate state changes to their descendants deep in the component hierarchy.

Inspired by react 16.3 context api and by @mjackson's polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js. 

**reactxx-stateman** extends Provider-Consumer model as follows:

### Extends **Consumer** component
- has ```render``` prop in addition to functional child component. It allows better Typescript typing.
- has ```selector``` prop which can select only part of provided state and:
  - this substate is used by render 
  - rendering is called only old and new substate differs (use shallowequal)

### Brings new **Modifer** component
- act like both Provider and Consumer
- its ```modify``` prop allow modifying cuerrent state ane send new walue down to component hiearchy
