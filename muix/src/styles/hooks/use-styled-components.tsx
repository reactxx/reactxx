import React from 'react'
import warning from 'warning'

import { TEngine, TComponents, O, TTyped } from 'reactxx-typings'
import { platform, useWidths } from 'reactxx-styles'

import { useDefaults } from './use-defaults'
import { useProps } from './use-props'
import { useTheme } from './use-theme'
import { mergePropsCode } from '../utils/merge'
import { toClassNamesWithQuery } from '../utils/to-classnames'
import { isStyledComponentData, $StyleComponentData } from '../queryable/$styled-component'

export const useStyledComponents = (
    sheet: TEngine.Sheet,
    classes: TEngine.Sheet,
    props: TTyped.PropsCode,
) => {
    // constant sheet check
    const sheetRef = React.useRef<{ classes?, props?}>(sheet)
    warning(sheetRef.current === sheet, 'Something wrong: sheetRef.current!==sheet')

    const parentPars = React.useRef<{ classes?, props?}>(null)
    const firstRender = parentPars.current === null
    parentPars.current = { classes, props }

    // init components on first render
    if (firstRender) {
        
        const createComp = ({Comp, sheetMap, defaultProps}: $StyleComponentData) => innerProps => {
            const { classes, props } = parentPars.current
            const mergedProps = { ...props, ...defaultProps || null, ...innerProps }
            const res: any = {}
            for (const p in sheetMap) res[p] = toClassNamesWithQuery(mergedProps, classes[sheetMap[p]])
            return <Comp classes={res} {...innerProps} />
        }

        for (const p in sheet) {
            const sheetComp = sheet[p]
            if (!isStyledComponentData(sheetComp)) continue
            const comp = sheet[p] = createComp(sheetComp)
            comp['displayName'] = 'styled-' + sheetComp.path
            comp['$s$'] = true
        }
    }

}

