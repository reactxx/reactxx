import warning from 'warning'
import { TVariants, TComponents } from 'reactxx-typings'

export interface IRegisterVariant {
    name: string,
    toVariantProc: TVariants.ToVariantProc<any>,
    testCondition: (conditions: TVariants.Condition, query: TVariants.Query) => boolean
}

export const registerVariant = (par: IRegisterVariant) => {
    warning (par && par.name && par.testCondition && par.toVariantProc && !variantsDir[par.name], `"${par.name}" variant already registered (or not "par.name && par.testCondition && par.toVariantProc")`)
    variants.push(par)
    variantsDir[par.name] = par
}

export const toVariantParts = (ruleset: TVariants.VariantPart) => 
    variants.filter(p => ruleset[p.name]).map(v => {
        return {proc: v.toVariantProc, part: ruleset[v.name]}
    })

export const testConditions = (conditions: TVariants.Conditions, query: TVariants.Query) => {
    if (!conditions || conditions.length === 0) return true
    return !conditions.find(cond => {
        warning(variantsDir[cond.type], `Missing initVariant${cond.type} call`)
        return variantsDir[cond.type].testCondition(cond, query)
    })
}

//*********************************************************
//  PRIVATE
//*********************************************************
const variants: IRegisterVariant[] = []
const variantsDir: Record<string, IRegisterVariant> ={}
