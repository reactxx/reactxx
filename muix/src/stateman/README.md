# reactxx-stateman

Propagate state changes to their descendants deep in the component hierarchy.

Inspired by react 16.3 context api and by @mjackson's polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js. 

## Installation

```npm install reactxx-stateman --save```

## **reactxx-stateman** extends Provider-Consumer model as follows:

### Extends **Consumer** component
- has ```render``` prop in addition to functional child component. It allows better Typescript typing.
- has ```selector``` prop which can compute derived data, allowing to use minimal possible substate in render.
- in addition, rendering is called only when old and new substate differs (uses shallowequal condition)

### Brings new Modifier component
- **Modifier** act like both Provider and Consumer
- its ```modify``` prop allows modifying current state. Modifier then sends this modified  walue down to the component hiearchy

## Example

TODO 
