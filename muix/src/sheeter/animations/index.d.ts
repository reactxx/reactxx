import { Consts, FinishAddIn } from 'reactxx-sheeter';
import { NativeAnimationAddIn } from './native';
import { WebAnimationAddIn } from './web';
export { NativeAnimationAddIn, NativeAnimationRuleset, InterpolationConfigTypes } from './native';
export { WebAnimationAddIn, WebAnimationRuleset } from './web';
export declare const animationFinishAddInClasses: FinishAddIn;
export declare type AnimationAddIn = WebAnimationAddIn | NativeAnimationAddIn;
export declare type AnimationAddIns = {
    [animName: string]: AnimationAddIn;
};
export declare type AnimToPairs<T> = [T, T];
export interface AnimTransform {
    perspective?: AnimToPairs<number>;
    rotate?: AnimToPairs<string>;
    rotateX?: AnimToPairs<string>;
    rotateY?: AnimToPairs<string>;
    rotateZ?: AnimToPairs<string>;
    scale?: AnimToPairs<number>;
    scaleX?: AnimToPairs<number>;
    scaleY?: AnimToPairs<number>;
    translateX?: AnimToPairs<number>;
    translateY?: AnimToPairs<number>;
    skewX?: AnimToPairs<string>;
    skewY?: AnimToPairs<string>;
    time?: string;
}
export interface AnimationConfig {
    $easing?: string;
    $duration?: number;
    $delay?: number;
    $opened?: boolean;
    useNativeDriver?: boolean;
    rulesetNames?: string[];
}
export interface SheetExtension extends AnimationConfig {
    [Consts.data]: AnimationConfig & {
        useNativeDriver?: boolean;
    };
}
declare type AnimRuleseLow = {
    [fieldName: string]: [number, number] | [number, number, string] | [string, string] | [string, string, string];
};
export declare type AnimRuleset = AnimRuleseLow & {
    transform?: AnimTransform;
};
export declare type AnimSheet = {
    [rulesetName: string]: AnimRuleset;
} & AnimationConfig;
export declare const getGaps: (interval: string, $duration: number) => {
    leftGap: number;
    rightGap: number;
    duration: number;
};
