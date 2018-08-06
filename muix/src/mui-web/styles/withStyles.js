"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var reactxx_basic_1 = require("reactxx-basic");
var reactxx_fela_1 = require("reactxx-fela");
var createMuiTheme_1 = require("reactxx-mui-web/styles/createMuiTheme");
exports.ThemeProvider = reactxx_basic_1.ThemeProviderUntyped;
var withStylesCreator = function (sheetCreator, component, options) {
    return function (overrideOptions) { return reactxx_basic_1.withStyles(sheetCreator, renderAddIn, __assign({}, options || null), overrideOptions)(component); };
};
exports["default"] = withStylesCreator;
exports.toAtomic = function (prefix, value) {
    var _a;
    var vals; //top, bottom, left, right
    if (typeof value === 'number')
        vals = [value, value, value, value];
    else if (typeof value === 'string') {
        var parts = value.split(' ');
        switch (parts.length) {
            case 1:
                vals = [value, value, value, value];
                break;
            case 2:
                vals = [parts[0], parts[0], parts[1], parts[1]];
                break;
            case 3:
                vals = [parts[0], parts[2], parts[1], parts[1]];
                break;
            case 4:
                vals = [parts[0], parts[2], parts[3], parts[1]];
                break; // top | right | bottom | left
            default: throw 'Wrong value: ' + value;
        }
    }
    else
        throw 'Wrong value: ' + value;
    return _a = {},
        _a[prefix + "Top"] = vals[0],
        _a[prefix + "Bottom"] = vals[1],
        _a[prefix + "Left"] = vals[2],
        _a[prefix + "Right"] = vals[3],
        _a;
};
// for MUI RIPPLE etc
reactxx_fela_1.renderer.renderStatic(['keyframes', '-webkit-keyframes'].map(function (keyframes) { return "\n@" + keyframes + " mui-ripple-enter {\n  0% {\n    opacity: 0.1;\n    transform: scale(0);\n  }\n  100% {\n    opacity: 0.3;\n    transform: scale(1);\n  }\n}\n@" + keyframes + " mui-ripple-exit {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@" + keyframes + " mui-ripple-pulsate {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(0.92);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@" + keyframes + " mui-progress-circular-rotate: {\n  100%: {\n    transform: rotate(360deg);\n  }\n}\n@" + keyframes + " mui-progress-circular-dash: {\n  0%: {\n    strokeDasharray: 1px 200px;\n    strokeDashoffset: 0px;\n  }\n  50%: {\n    strokeDasharray: 100px 200px;\n    strokeDashoffset: -15px;\n  }\n  100%: {\n    strokeDasharray: 100px 200px;\n    strokeDashoffset: -120px;\n  }\n\n@" + keyframes + " mui-indeterminate1: {\n    0%: {\n      left: -35%;\n      right: 100%;\n    }\n    60%: {\n      left: 100%;\n      right: -90%;\n    }\n    100%: {\n      left: 100%;\n      right: -90%;\n    }\n  }\n@" + keyframes + " mui-indeterminate2: {\n  0%: {\n    left: -200%;\n    right: 100%;\n  }\n  60%: {\n    left: 107%;\n    right: -8%;\n  }\n  100%: {\n    left: 107%;\n    right: -8%;\n  }\n}\n@" + keyframes + " buffer: {\n  0%: {\n    opacity: 1;\n    backgroundPosition: 0px -23px;\n  }\n  50%: {\n    opacity: 0;\n    backgroundPosition: 0px -23px;\n  }\n  100%: {\n    opacity: 1;\n    backgroundPosition: -200px -23px;\n  }\n}\n\n"; }).join(''));
//************ SHEET HOOK
var createSheetHook = function (sheetCreator) {
    if (typeof sheetCreator === 'function')
        return function (theme, par) { return modifySheet(sheetCreator(theme, par)); };
    else
        return modifySheet(sheetCreator);
};
var modifySheet = function (sheet) {
    for (var rulesetName in sheet)
        modifyRuleset(sheet, rulesetName);
    return sheet;
};
function modifyRuleset(sheet, rulesetName) {
    if (rulesetName.startsWith('@keyframes')) {
        delete sheet[rulesetName];
        return;
    }
    return;
    var ruleset = sheet[rulesetName];
    var $whenUsed = null;
    Object.keys(ruleset).forEach(function (ruleName) {
        var rule = ruleset[ruleName];
        var pseudoClasses = rx$pseudoClasses.exec(ruleName);
        if (false && pseudoClasses) {
            ruleset[pseudoClasses[1]] = rule;
            delete ruleset[ruleName];
        }
        else {
            var whenUsed = rx$whenUsed.exec(ruleName);
            if (whenUsed) {
                ($whenUsed || ($whenUsed = {}))[whenUsed[1]] = rule;
                delete ruleset[ruleName];
            }
            else if (rule && typeof rule === 'object') {
                modifyRuleset(ruleset, ruleName);
            }
        }
    });
    if ($whenUsed)
        ruleset['$whenUsed'] = $whenUsed;
}
var rx$pseudoClasses = /&(:(:)?((\w|-)+))$/;
var rx$whenUsed = /&\$(\w+)$/;
// empty addIn configuration
var renderAddIn = {
    propsAddInPipeline: function (renderState, next) { return next; },
    styleAddInPipeline: function (renderState, next) { return next; },
    getDefaultTheme: function () { return createMuiTheme_1["default"](); },
    createSheetHook: createSheetHook,
    rulesetsToClassNames: reactxx_fela_1.rulesetToClassNamesMUI
};
