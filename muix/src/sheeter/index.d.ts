export * from './animations/index';
export * from './mediaq';
export * from './when-used';
export declare const enum Consts {
    $system = "$system",
    $whenUsed = "$whenUsed",
    path = "#path",
    rulesetName = "#rulesetName",
    data = "#data",
    dataObservedBits = "observedBits"
}
export interface SheetWithAddIns extends Sheet {
    $system: AddIns;
}
export declare type AddIns = {
    [addInsName: string]: Sheets;
};
export declare type Sheets = {
    [sheetName: string]: Sheet;
};
export declare type Sheet = {
    [rulesetName: string]: Ruleset;
};
export interface Ruleset extends Node {
    [Consts.rulesetName]?: string;
}
export declare type Node = {
    [ruleName: string]: Node | any;
};
export declare type UsedRulesetNames = {
    [rulesetName: string]: boolean;
};
export interface AddInRulesetPar {
    usedRulesetNames?: UsedRulesetNames;
    addInSheet: Sheet;
}
export declare type RulesetPatchGetter = (par: AddInRulesetPar) => Ruleset[];
export declare type RulesetPatchGetters = {
    [addInName: string]: RulesetPatchGetter;
};
export declare type PropsPatchGetter = (par: {}, patches: Array<{}>) => void;
export declare type PropsPatchGetters = {
    [addInName: string]: PropsPatchGetter;
};
export declare type FinishAddIn = (addInItem: {}) => void;
export declare type FinishAddIns = {
    [addInName: string]: FinishAddIn;
};
export declare const finishProps: (root: Sheet, onFinishAddInProps: FinishAddIns) => Sheet;
export declare const getPropsPatch: (addInsRoot: AddIns, propsPatchGetters: PropsPatchGetters) => any[];
export declare const toPatchableAndMergeable: (root: Sheet) => SheetWithAddIns;
export declare const mergeSheets: (sheet: SheetWithAddIns, modifiers: SheetWithAddIns[], canModify: boolean) => SheetWithAddIns;
export declare const mergeSheetsAndFinish: (sheet: SheetWithAddIns, modifiers: SheetWithAddIns[], onFinishAddInClasses: FinishAddIns, canModify?: boolean) => SheetWithAddIns;
export declare const mergeRulesetsForCode: (sheet: SheetWithAddIns, rulesetPatchGetters: RulesetPatchGetters, rulesets: Ruleset[]) => Ruleset;
export declare const filterRulesetNames: (sheet: Sheet) => string[];
export declare const isObject: (obj: any) => boolean;
export declare const linearize: (root: Node) => any;
export declare const deepMerges: (target: any, sources: Node[]) => any;
export declare const deepMerge: (target: any, source: any) => any;
export declare const immutableMerge: (sources: Node[]) => any;
