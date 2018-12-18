import React from 'react'
import warning from 'warning'

import { TEngine, TComponents, TTyped } from 'reactxx-typings'

import { toClassNamesWithQuery } from '../utils/to-classnames'
import { atomizeRuleset } from '../utils/atomize'

//********* HOOK ************ */
// finish styled component definition
export const useStyledComponents = <T extends TEngine.Sheet>(
    classes: T,
    props: TTyped.PropsCode,
) => {

    const propsRef = React.useRef(null) // closure with actual props for rendering
    propsRef.current = props

    const createComp =
        ({ Comp, sheetMap, defaultProps }: $StyleComponentData) => // data from $component(...)(...)
            innerProps => {
                const props = propsRef.current // get actual props from closure
                // create actual sheet for styled component
                const res: any = {}
                for (const p in sheetMap) res[p] = toClassNamesWithQuery(props, classes[sheetMap[p]])
                // render styled component
                const mergedProps = { ...defaultProps, ...innerProps, classes: res } // merge props
                return React.createElement(Comp, mergedProps)
            }


    const classesNew = React.useMemo(() => {

        const res: T = classes
        for (const p in classes) {
            const sheetComp = classes[p]
            if (!isStyledComponentData(sheetComp)) continue
            if (res === classes) res === { ...classes as any }
            const comp = res[p] = createComp(sheetComp)
            comp['displayName'] = 'styled-' + sheetComp.path
            comp['$s$'] = true
        }

        return res

    }, [classes])

    return classesNew
}

//********* ENGINE ************ */

// called in sheet definition, results used in atomizeSheet
export const $component = (
    Comp: TComponents.SFC,
    sheet: TEngine.Sheet,
    defaultProps: TComponents.Props
) => {
    // called in atomizeSheet, result sits in sheet till the useStyledComponents is called
    const res = (parentSheet: TEngine.Sheet, parentSheetProp: string, path: string) => {
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
    res.$stemp$ = true
    return res
}

export function isStyledComponentTemp(obj): obj is $StyleComponent {
    return (obj as $StyleComponent).$stemp$
}

export function isStyledComponentData(obj): obj is $StyleComponentData {
    return (obj as $StyleComponentData).$sdata$
}

export function isStyledComponent(obj): obj is {} {
    return obj.$s$
}

export type $StyleComponent = ReturnType<typeof $component>
export type $StyleComponentData = ReturnType<$StyleComponent>
