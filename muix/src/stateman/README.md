# reactxx-stateman

Propagate state changes to their descendants in the component hierarchy.

Inspired by **react 16.3** context api and by @mjackson's polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js. 

## Installation

```npm install reactxx-stateman --save```

## **reactxx-stateman** extends Provider-Consumer model as follows:

### Extends **Consumer** component
- Consumer has ```render``` prop in addition to functional child component. It allows better Typescript typing.
- Consumer has ```selector``` prop which can compute derived data. I allows to use minimal possible substate during render.
- Consumer's render is only called when old and new substate differs (shallowequal is used for comparison)

### Brings new Modifier component
- **Modifier** act like both Provider and Consumer
- its ```modify``` prop allows modifying current state. Modifier then sends this modified value down to component hiearchy

## Example

TODO 
