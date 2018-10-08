import warning from 'warning'
import { TVariants, TComponents } from 'reactxx-typings'

export interface IVariantHandler {
    name: string,
    toAtomicRuleset: TVariants.ToAtomicRuleset<any>,
    testAtomicRuleset: (conditions: TVariants.Condition, query: TVariants.Query) => boolean
}

export const registerVariantHandler = (handler: IVariantHandler) => {
    warning(handler && handler.name && handler.testAtomicRuleset && handler.toAtomicRuleset && !variantHandlersDir[handler.name], `"${handler.name}" variant already registered (or not "par.name && par.testCondition && par.toVariantProc")`)
    variantHandlers.push(handler)
    variantHandlersDir[handler.name] = handler
}

// process variant part of ruleset: $sheetSwitch, $transition etc.
export const atomizeVariants: TVariants.ToAtomicRuleset<TVariants.VariantPart> =
    (list, ruleset, path, pseudoPrefixes, conditions, rulesetToQueue) =>
        variantHandlers.forEach(variantHandler => {
            // for every variant handler ...
            const rulesetsVariant = ruleset[variantHandler.name]
            // ... does exist variant in ruleset?
            if (!rulesetsVariant) return
            // ... apply handler proc to ruleset's variant
            variantHandler.toAtomicRuleset(list, rulesetsVariant, path, pseudoPrefixes, conditions, rulesetToQueue)
        })

export const testConditions = (conditions: TVariants.Conditions, query: TVariants.Query) => {
    if (!conditions || conditions.length === 0) return true
    return !conditions.find(cond => {
        warning(variantHandlersDir[cond.type], `Missing initVariant${cond.type} call`)
        return variantHandlersDir[cond.type].testAtomicRuleset(cond, query)
    })
}

//*********************************************************
//  PRIVATE
//*********************************************************
const variantHandlers: IVariantHandler[] = []
const variantHandlersDir: Record<string, IVariantHandler> = {}
