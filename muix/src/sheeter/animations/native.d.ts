import ReactN from 'react-native';
import { Consts, Sheets } from 'reactxx-sheeter';
import { AnimationConfig } from '.';
export declare const $animationsToInterpolate: ($animations: Sheets) => void;
export declare type NativeAnimationAddIn = {
    [rulesetName: string]: NativeAnimationRuleset;
} & {
    [Consts.data]?: AnimationConfig;
};
export declare type NativeAnimationRuleset = InterpolationConfigTypes & {
    transform?: InterpolationConfigTypes;
};
declare type InterpolationConfigType = ReactN.Animated.InterpolationConfigType;
export declare type InterpolationConfigTypes = {
    [ruleName: string]: InterpolationConfigType;
};
export {};
