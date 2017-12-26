declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

declare module 'enzyme' {
  export const mount:any
  export const render: any
  export const shallow: any
  export type EnzymeSelector = any
  export type CommonWrapper<T,S> = any
}

declare type EnzymeSelector = any
declare const mount: any
declare const render: any
declare const shallow: any