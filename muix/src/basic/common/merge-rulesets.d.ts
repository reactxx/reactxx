import React from 'react';
import * as Sheeter from 'reactxx-sheeter';
export declare const mergeRulesetsCreator: (classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters) => (...rulesets: Sheeter.Ruleset[]) => any;
export declare const mergeRulesetsCreatorStr: (classes: Sheeter.SheetWithAddIns, getClassesPatches: Sheeter.RulesetPatchGetters) => (...rulesets: Sheeter.Ruleset[]) => any;
export declare const classNames: (...rulesets: ({} | React.CSSProperties)[]) => any;
export declare const classNamesStr: (...rulesets: React.CSSProperties[]) => any;
export declare const classNamesStrMUI: (...rulesets: React.CSSProperties[]) => any;
