import React from 'react'

export * from './conditions/index'
export * from './utils/deep-merge'
export * from './utils/globals'
//export * from './conditions'
export * from './utils/merge'
export * from './utils/wrap-pseudo-prefixes'

export {atomizeSheet, atomizeRuleset, atomizeStyle} from './utils/atomize'
export {toClassNamesWithQuery} from './utils/to-classnames'
export {adjustAtomizedLow, isToAtomizeArray} from './utils/atomize-low'


import { init } from './$web'
import { initGlobals } from './utils/globals'

export const initSheeter$Web = (force?: boolean) => initGlobals(force, init)
export const initSheeter = initSheeter$Web

//initSheeter()

declare module 'react' {
    function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
    function useEffect(
        create: () => void | (() => void),
        inputs?: ReadonlyArray<unknown>
    ): void;
    function useContext<T>(foo: React.Context<T>): T;
    function useReducer<S, A>(
        reducer: (state: S, action: A) => S,
        initialState: S
    ): [S, (action: A) => void];
    function useCallback<F extends (...args: never[]) => unknown>(
        callback: F,
        inputs?: ReadonlyArray<unknown>
    ): F;
    function useMemo<T>(create: () => T, inputs?: ReadonlyArray<unknown>): T;
    function useRef<T extends unknown>(initialValue?: T): RefObj<T>;
    function useImperativeMethods<T>(
        ref: React.Ref<T>,
        createInstance: () => T,
        inputs?: ReadonlyArray<unknown>
    ): void;
    const useMutationEffect: typeof useEffect;
    const useLayoutEffect: typeof useEffect;
    const memo: <T>(comp: T) => T

    interface RefObj<T> {
        current: T | null;
    }

}
