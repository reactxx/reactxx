import React from 'react';
import { TCommonStyles } from './common-styles';
export declare namespace TCommon {
    type TEventOnPress = 'onPress';
    type TEvents = 'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut';
    type TEventsX = 'onPress' | 'onLongPress';
    type TEventsAll = TEvents;
    interface EmptySheet {
    }
    interface Shape {
        common?: EmptySheet;
        native?: EmptySheet;
        web?: string;
        style?: TCommonStyles.RulesetNativeIds;
        events?: TEvents | null;
        props?: TCommon.EmptySheet;
        propsNative?: {};
        propsWeb?: React.HTMLAttributes<Element>;
        variant?: {};
        theme?: ThemeBase;
    }
    type getCommon<R extends Shape> = R['common'];
    type getNative<R extends Shape> = R['native'];
    type getWeb<R extends Shape> = R['web'];
    type getStyle<R extends Shape> = R['style'];
    type getProps<R extends Shape> = R['props'];
    type getPropsWeb<R extends Shape> = R['propsWeb'];
    type getPropsNative<R extends Shape> = R['propsNative'];
    type getVariant<R extends Shape = Shape> = R['variant'];
    type getTheme<R extends Shape = Shape> = R['theme'];
    type getEvents<R extends Shape = Shape> = R['events'];
    type ShapeTexts<P extends string> = {
        [p in P]: 'Text';
    };
    type ShapeViews<P extends string> = {
        [p in P]: 'View';
    };
    type ShapeScrollViews<P extends string> = {
        [p in P]: 'ScrollView';
    };
    type ShapeImages<P extends string> = {
        [p in P]: 'Image';
    };
    interface ThemeBase {
    }
    interface WithStyleOptions {
        name?: string;
        withTheme?: boolean;
        withCascading?: boolean;
        withActive?: boolean;
        isMui?: boolean;
        getVariant?: any;
        variantToString?: any;
        defaultProps?: any;
    }
    type ThemeProviderProps<T extends ThemeBase = ThemeBase> = {
        theme: T | string | ((parentTheme: T) => T);
    };
    type ThemeProviderTyped<T extends ThemeBase = ThemeBase> = React.ComponentClass<ThemeProviderProps<T>>;
    interface ThemeContext {
        theme?: ThemeBase;
        $cache?: {}[];
    }
}
