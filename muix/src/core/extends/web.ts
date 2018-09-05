import { CommonProperties } from '../typings/extends'
/******************************************
  EXTEND REACT
*******************************************/
// https://stackoverflow.com/questions/40093655/how-do-i-add-attributes-to-existing-html-elements-in-typescript-jsx
// https://github.com/Microsoft/TypeScript/issues/10859
declare module 'react' {
  interface HTMLAttributes<T> extends CommonProperties {
  }
  interface SVGAttributes<T> extends CommonProperties {
  }
}

