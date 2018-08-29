import React from 'react';
import ReactN from 'react-native';
import { TCommonStyles } from 'reactxx-basic';
import { TCommon } from 'reactxx-basic';
import { Ruleset as SheeterRuleset } from 'reactxx-sheeter';
import { TAddIn } from './add-in';
import * as Sheeter from 'reactxx-sheeter';
export declare namespace Types {
    type RulesetXPure<T extends TCommonStyles.RulesetNativeIds = 'Text'> = TCommonStyles.RulesetCommon<T> & {
        $native?: TCommonStyles.RulesetNative<T>;
        $web?: TCommonStyles.RulesetWeb;
        $before?: RulesetX<T>;
        $after?: RulesetX<T>;
    };
    type RulesetX<T extends TCommonStyles.RulesetNativeIds = 'Text', R extends Shape = Shape> = RulesetXPure<T> & TAddIn.RulesetAddInX<T, R>;
    interface ViewRulesetX extends RulesetX<'View'> {
    }
    interface TextRulesetX extends RulesetX<'Text'> {
    }
    interface ImageRulesetX extends RulesetX<'Image'> {
    }
    interface Shape extends TCommon.Shape, TAddIn.Shape {
    }
    interface ShapeDefault extends TAddIn.ShapeDefault {
        common: TCommon.EmptySheet;
        native: TCommon.EmptySheet;
        web: string;
        style: string;
        events: null;
        props: {};
        propsNative: ReactN.ViewProperties;
        propsWeb: React.HTMLAttributes<HTMLElement>;
        variant: never;
        theme: TCommon.ThemeBase;
    }
    type OverwriteShape<R extends Shape> = PartialOverwrite<ShapeDefault, R>;
    type SheetX<R extends Shape = Shape> = SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R> & TAddIn.SheetX<R>;
    type PartialSheetX<R extends Shape = Shape> = Partial<SheetXCommon<R> & SheetXNative<R> & SheetXWeb<R>> & DeepPartial<TAddIn.SheetX<R>>;
    type SheetXCommon<R extends Shape> = {
        [P in keyof TCommon.getCommon<R>]: Partial<RulesetX<TCommon.getCommon<R>[P], R>>;
    };
    type SheetXNative<R extends Shape> = {
        [P in keyof TCommon.getNative<R>]: {
            $native?: TCommonStyles.RulesetNative<TCommon.getNative<R>[P]>;
        } & TAddIn.RulesetAddInX<TCommon.getNative<R>[P], R>;
    };
    type SheetXWeb<R extends Shape> = {
        [P in TCommon.getWeb<R>]: {
            $web?: TCommonStyles.RulesetWeb;
        } & TAddIn.RulesetAddInX<'Text', R>;
    };
    type SheetCreatorX<R extends Shape = Shape> = themeCreator<R, SheetX<R>>;
    type RulesetNamesWeb<R extends Shape = Shape> = keyof TCommon.getCommon<R> | TCommon.getWeb<R>;
    type RulesetNamesNative<R extends Shape = Shape> = keyof TCommon.getCommon<R> | keyof TCommon.getNative<R>;
    type RulesetNames<R extends Shape = Shape> = keyof TCommon.getCommon<R> | TCommon.getWeb<R> | keyof TCommon.getNative<R>;
    type SheetWeb<R extends Shape = Shape> = PartialRecord<RulesetNamesWeb<R>, SheeterRuleset>;
    type SheetNative<R extends Shape = Shape> = PartialRecord<RulesetNamesNative<R>, SheeterRuleset>;
    type Sheet<R extends Shape = Shape> = PartialRecord<RulesetNames<R>, SheeterRuleset>;
    type themeCreator<R extends Shape, T extends {}> = T | ((theme: TCommon.getTheme<R>, variant: TCommon.getVariant<R>) => T);
    type RootRulesetCreatorX<R extends Shape = Shape, TRulesetAddIn extends {} = {}> = themeCreator<R, RulesetX<TCommon.getStyle<R>, R>>;
    type PartialSheetCreatorX<R extends Shape = Shape> = themeCreator<R, PartialSheetX<R>>;
    type ThemedPropsX<R extends Shape = Shape> = (theme: TCommon.getTheme<R>) => PropsX<R>;
    interface PropsXEx<R extends Shape = Shape> {
        style?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<TCommon.getStyle<R>, R>>;
        $web?: Partial<TCommon.getPropsWeb<R>>;
        $native?: Partial<TCommon.getPropsNative<R>>;
        $themedProps?: ThemedPropsX<R>;
        classes?: PartialSheetCreatorX<R>;
        className?: RootRulesetCreatorX<R, TAddIn.RulesetAddInX<TCommon.getStyle<R>, R>>;
    }
    type PropsX<R extends Shape = Shape> = PartialOverwrite<TCommon.getProps<R>, PropsXEx<R> & TEventsX<R> & TAddIn.PropsX<R>>;
    type TEventsX<R extends Shape = Shape> = PartialRecord<TCommon.getEvents<R>, MouseEventEx<R>>;
    type ComponentTypeX<R extends Shape> = React.ComponentType<PropsX<R>>;
    type SFCX<R extends Shape = Shape> = React.SFC<PropsX<R>>;
    type omitPropNames = 'system' | 'style' | 'classes' | 'className' | keyof TAddIn.CodeProps;
    type TMergeRulesetsResult<T extends TCommonStyles.RulesetNativeIds | 'Web' | {}> = T extends TCommonStyles.RulesetNativeIdsLow ? TCommonStyles.RulesetNative<T> : T extends 'Web' ? TCommonStyles.RulesetWeb : T;
    type CodeSystem<R extends Shape = Shape> = {
        theme?: TCommon.getTheme<R>;
        variant?: TCommon.getVariant<R>;
        mergeRulesets?: <T extends TCommonStyles.RulesetNativeIds | 'Web' | {}>(...rulesets: any[]) => TMergeRulesetsResult<T>;
    } & TEventsX<R>;
    type CodePropsWeb<R extends Shape = Shape> = OmitPartial<TCommon.getProps<R> & TCommon.getPropsWeb<R>, omitPropNames> & Types.OnPressAllWeb & TAddIn.CodeProps<R> & {
        style?: {
            [rule: string]: any;
        };
        className?: {
            [rule: string]: any;
        } | string;
        classes?: {
            [ruleset: string]: any;
        };
        children?: React.ReactNode;
        $system?: $SystemLow<R>;
    };
    type CodeSFCWeb<R extends Shape> = React.SFC<CodePropsWeb<R>>;
    type CodePropsNative<R extends Shape = Shape> = OmitPartial<TCommon.getProps<R> & TCommon.getPropsNative<R>, omitPropNames> & Types.OnPressAllNative & TAddIn.CodeProps<R> & {
        className: TCommonStyles.RulesetNative<TCommon.getStyle<R>>;
        classes: SheetNative<R>;
        children?: React.ReactNode;
        $system?: $SystemLow<R>;
    };
    type CodeSFCNative<R extends Shape> = React.SFC<CodePropsNative<R>>;
    type $SystemLow<R extends Shape = Shape> = TEventsX<R> & {
        theme?: TCommon.getTheme<R>;
        variant?: TCommon.getVariant<R>;
        classNames?: <T extends TCommonStyles.RulesetNativeIds | 'Web' | {}>(...rulesets: any[]) => TMergeRulesetsResult<T>;
        classNamesStr?: (...rulesets: any[]) => string;
        classNamesAny?: (Component: any, ...rulesets: any[]) => string | TMergeRulesetsResult<any>;
        $ignore?: boolean;
        $constant?: boolean;
        $developer_flag?: boolean;
        $developer_RenderCounter?: number;
    } & Sheeter.AddIns;
    type CodeProps<R extends Shape = Shape> = OmitPartial<TCommon.getProps<R> & (TCommon.getPropsNative<R> | TCommon.getPropsWeb<R>), omitPropNames> & Types.OnPressAllNative & Types.OnPressAllWeb & TAddIn.CodeProps<R> & {
        $system?: $SystemLow<R>;
        children?: React.ReactNode;
        style?: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<TCommon.getStyle<R>>;
        className?: TCommonStyles.RulesetWeb | TCommonStyles.RulesetNative<TCommon.getStyle<R>>;
        classes?: Sheet<R>;
    };
    type PartialCodeProps<R extends Shape = Shape> = Partial<CodeProps<Shape>>;
    type CodeSFC<R extends Shape> = React.SFC<CodeProps<R>>;
    type CodeComponent<R extends Shape> = React.Component<CodeProps<R>>;
    type CodeComponentType<R extends Shape = Shape> = React.ComponentType<CodeProps<R>>;
    interface SeparatedProps {
        classes?: Types.PartialSheetCreatorX;
        className?: Types.RootRulesetCreatorX;
        style?: Types.RootRulesetCreatorX;
        $themedProps?: Types.ThemedPropsX;
        rest?: Types.PropsX;
    }
    interface AccumulatedStylesFromProps {
        classes: Types.PartialSheetCreatorX[];
        className: Types.RootRulesetCreatorX[];
        style: Types.RootRulesetCreatorX[];
    }
    interface WithStyleOptions_ComponentX<R extends Types.Shape = Types.Shape> extends TCommon.WithStyleOptions {
        getVariant?: (props: Types.CodeProps<R>, theme?: TCommon.getTheme<R>) => TCommon.getVariant<R>;
        variantToString?: (variant: TCommon.getVariant<R>) => string;
        defaultProps?: Types.PropsX<R>;
    }
    interface MouseEventPar<R extends Types.Shape = Types.Shape> extends React.MouseEvent<Element> {
        current?: CodeProps<R>;
    }
    type MouseEventEx<R extends Types.Shape = Types.Shape> = React.EventHandler<MouseEventPar<R>>;
    interface OnPressX<R extends Types.Shape = Types.Shape> {
        onPress?: MouseEventEx<R>;
        onLongPress?: MouseEventEx<R>;
    }
    interface OnPressAllX<R extends Types.Shape = Types.Shape> extends OnPressX<R> {
        onPressIn?: MouseEventEx<R>;
        onPressOut?: MouseEventEx<R>;
    }
    interface OnPressAllWeb {
        onClick?: React.MouseEventHandler<Element>;
        onMouseDown?: React.MouseEventHandler<Element>;
        onMouseUp?: React.MouseEventHandler<Element>;
    }
    interface NativeEventPar<R extends Types.Shape = Types.Shape> extends ReactN.GestureResponderEvent {
        current?: CodeProps<R>;
    }
    interface OnPressAllNative {
        onPress?: () => void;
        onPressIn?: () => void;
        onPressOut?: () => void;
        onLongPress?: () => void;
    }
}
