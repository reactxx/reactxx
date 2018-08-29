import React from 'react';
import { AnimationConfig } from './index';
import { Consts, Sheets } from 'reactxx-sheeter';
export declare const $animationsToCSS: ($animations: Sheets) => void;
export declare type WebAnimationAddIn = {
    [rulesetName: string]: WebAnimationRuleset;
} & {
    [Consts.data]?: AnimationConfig;
};
export declare type WebAnimationRuleset = React.CSSProperties;
