import React from 'react'
import { TComponents, TEngine, TTyped } from 'reactxx-typings';
import { atomizeRuleset } from '../utils/atomize'

export const $component = (
    Comp: TComponents.SFC,
    sheet: TEngine.Sheet,
    defaultProps: TComponents.Props
) => {
    const res = (parentSheet: TEngine.Sheet, parentSheetProp: string, path: string) => {
        const sheetMap: Record<string, string> = {}
        if (sheet) {
            for (const p in sheet) {
                const newName = `${parentSheetProp}.${p}`
                parentSheet[newName] = atomizeRuleset(sheet[p], null, '')
                sheetMap[p] = newName
            }
        }
        return { Comp, sheetMap, defaultProps, path, $sdata$: true }
    }
    res.$stemp$ = true
    return res
}

export function isStyledComponentTemp(obj): obj is $StyleComponent {
    return (obj as $StyleComponent).$stemp$
}

export function isStyledComponentData(obj): obj is $StyleComponentData {
    return (obj as $StyleComponentData).$sdata$
}

export type $StyleComponent = ReturnType<typeof $component>
export type $StyleComponentData = ReturnType<$StyleComponent>



