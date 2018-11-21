import { TAtomize, TComponents, TVariants } from 'reactxx-typings'
import { platform, registerVariantHandler, adjustAtomizedLow, isToAtomizeArray } from 'reactxx-sheeter'
import { Consts } from '../variants'
import { intervalToSelector, parse, test } from './parser'

export const registerWidthsHandler = () => registerVariantHandler({
    name: Consts.name,
    toAtomicRuleset,
    testAtomicRuleset
})

//*********************************************************
//  PRIVATE
//*********************************************************

interface WidthsCondition extends TVariants.Condition {
    type: Consts.name
    interval: [number, number]
}

const toAtomicRuleset: TVariants.ToAtomicRuleset<TVariants.SheetWidthsPart> = (
    list, widths, path, _pseudoPrefixes, _conditions
) => {
    if (!widths) return
    const pseudoPrefixes = (widthName: string) => window.isWeb
        ? [..._pseudoPrefixes, intervalToSelector(widthName)]
        : _pseudoPrefixes
    const conditions = (widthName: string) =>
        window.isWeb
            ? _conditions
            : [..._conditions, wrapCondition({ type: Consts.name, interval: parse(widthName) })]
    for (const widthName in widths) {
        const casep = widths[widthName]
        if (!casep) continue
        if (isToAtomizeArray(casep))
            casep.forEach((ruleset, idx) =>
                adjustAtomizedLow(
                    list, ruleset, 
                    `${path}/$switch.${widthName}[${idx}]`,
                    pseudoPrefixes(widthName),
                    conditions(widthName))
            )
        else
            adjustAtomizedLow(
                list,
                casep as TAtomize.Source,
                `${path}/$widths.${widthName}`,
                pseudoPrefixes(widthName),
                conditions(widthName))
    }
}

const testAtomicRuleset: TComponents.TestAtomicRuleset = (cond: WidthsCondition, state) =>
    test(cond.interval, platform.actWidth())


    export const wrapCondition = (cond: WidthsCondition) => {
        if (window.__TRACE__)
            cond['toJSON'] = toJSON.bind(cond)
        return cond
    }
    
    function toJSON() {
        const c = this as WidthsCondition
        return `IF ${c.type}: <${c.interval[0]},${c.interval[1] || 'MAX'}) )`
    }
    
    