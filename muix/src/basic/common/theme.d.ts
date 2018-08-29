import React from 'react';
import { TCommon } from '../typings/common';
export declare const registerTheme: <T extends {} = never>(name: string, theme: T) => void;
export declare const themePipe: (getDefaultTheme: () => TCommon.ThemeBase, input: () => {
    withTheme: boolean;
}, output: (outputPar: TCommon.ThemeContext) => void, next: () => React.ReactNode) => () => {};
export declare class ThemeProvider extends React.Component<TCommon.ThemeProviderProps> {
    render(): JSX.Element;
    PROVIDER: (parentContext: TCommon.ThemeContext) => JSX.Element;
    themeContext: TCommon.ThemeContext;
}
export declare const ThemeConsumer: React.ComponentType<React.ConsumerProps<TCommon.ThemeContext>>;
export declare const ThemeProviderUntyped: React.ComponentClass<{
    theme: any;
}>;
