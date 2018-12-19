import React from 'react'

import { TEngine, TComponents, TTyped } from 'reactxx-typings'

import { toClassNamesWithQuery } from '../utils/to-classnames'
import { atomizeRuleset } from '../utils/atomize'
import { removeConditions } from '../utils/remove-conditions'

//********* HOOK ************ */
// finish styled component definition
export const useStyledComponents = <T extends TEngine.Sheet>(
    classes: T,
    props: TTyped.PropsCode,
) => {

    const propsRef = React.useRef(null) // closure with actual props for rendering
    propsRef.current = props

    const createStyledComp =
        ({ Comp, sheetMap, defaultProps, path }: $StyleComponentData) => {// data from $component(...)(...)

            const comp: $StyleComponent = innerProps => {
                const props = propsRef.current // get actual props from closure
                // create actual sheet for styled component
                const res: any = {}
                for (const p in sheetMap)
                    res[p] = removeConditions(toClassNamesWithQuery(props, classes[sheetMap[p]]))
                // render styled component
                const mergedProps = { ...defaultProps, ...innerProps, classes: res } // merge props
                return React.createElement(Comp, mergedProps)
            }

            comp.displayName = 'styled-' + path
            comp.$s$ = true
            
            return comp
        }


    const classesNew = React.useMemo(() => {

        let res: T = classes
        for (const p in classes) {
            const sheetComp = classes[p]
            if (!isStyledComponentData(sheetComp)) continue
            if (res === classes)
                res = { ...classes as TEngine.Sheet } as T
            res[p] = createStyledComp(sheetComp)
        }

        return res

    }, [classes])

    return classesNew
}

//********* ENGINE ************ */

// called in sheet definition, result function is used in atomizeSheet
export const $component = (
    Comp: TComponents.SFC,
    sheet: TEngine.Sheet,
    defaultProps: TComponents.Props
) => {
    // called in atomizeSheet, result sits in sheet till the useStyledComponents is called
    const result = (parentSheet: TEngine.Sheet, parentSheetProp: string, path: string) => {
        const sheetMap: Record<string, string> = {}
        if (sheet) {
            for (const p in sheet) {
                const newName = `${parentSheetProp}.${p}`
                parentSheet[newName] = atomizeRuleset(sheet[p], null, path + '/' + Comp.displayName + '.' + p)
                sheetMap[p] = newName
            }
        }
        return { Comp, sheetMap, defaultProps, path, $sdata$: true }
    }
    result.$stemp$ = true
    return result
}

export function isStyledComponentTemp(obj): obj is $StyleComponentTemp {
    return obj && (obj as $StyleComponentTemp).$stemp$
}

export function isStyledComponentData(obj): obj is $StyleComponentData {
    return obj && (obj as $StyleComponentData).$sdata$
}

export function isStyledComponent(obj): obj is $StyleComponent {
    return obj && (obj as $StyleComponent).$s$
}

type $StyleComponentTemp = ReturnType<typeof $component>
type $StyleComponentData = ReturnType<$StyleComponentTemp>
type $StyleComponent = React.SFC<any> & {
    $s$?: boolean
}
