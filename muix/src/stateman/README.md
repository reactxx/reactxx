# reactxx-stateman

Propagate state changes to their descendants in the component hierarchy.

Inspired by **react 16.3** context api and by @mjackson's polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js. 

## Installation

```npm install reactxx-stateman --save```

## Extends Provider-Consumer model as follows:

### **Consumer** component:
- has ```render``` prop in addition to functional child component. It allows better Typescript typing.
- has ```selector``` prop which can compute derived data. ```selector``` allows to use minimal possible substate during render.
- render is only called when old and new substate differs (shallowequal is used for comparison)

### Brings new Modifier component:
- **Modifier** act like both Provider and Consumer
- its ```modify``` prop allows modifying current state. Modifier then sends this modified value down to component hiearchy

## Example

[![Edit 92vp73oj3y](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/92vp73oj3y?module=%2Fsrc%2Fapp.tsx)

*Notice: Both reactxx-stateman and RenderCounter component in following example uses **React render props** extensively. 
See https://reactjs.org/docs/render-props.html for details*
