import React from 'react'
import { createSerializer, OutputMapper } from 'enzyme-to-json'


import { TSheeter, TVariants, TComponents, TWithStyles } from 'reactxx-typings'
import * as WithStyle from 'reactxx-with-styles'
import {
    toClassNamesWithQuery,
    platform,
    globalOptions,
} from "reactxx-sheeter";
import { initPlatform, mount } from './index'
import { Shape, theme } from './shape'
import console = require('console');

export const ReactAny: React.SFC<any> = ({ children }) => children || null
ReactAny.displayName = 'ReactAny'


export const traceComponentEx = (
    isWeb: boolean,
    traceLevel: number,
    sheet: TSheeter.SheetOrCreator<Shape>,
    comp: TComponents.SFCCode<Shape>,
    node: (Comp: TComponents.ComponentClass<Shape>) => React.ReactElement<{}>,
    componentOptions?: TWithStyles.ComponentOptions<Shape>
) => {
    initPlatform(isWeb)
    globalOptions.namedThemes[WithStyle.defaultThemeName] = theme
    window.__TRACELEVEL__ = traceLevel as any
    const Comp = WithStyle.withStylesCreator(sheet, comp)({ ...componentOptions || {}, displayName: 'TestComponent' })

    //  JEST and ENZYME:
    let wrapper = mount(node(Comp))
    expect.addSnapshotSerializer(createSerializer({ map: filter, noKey: true }) as any);
    expect(wrapper).toMatchSnapshot();
}

// https://github.com/adriantoine/enzyme-to-json/issues/110
const filter: OutputMapper = json => {

    if (json.type === 'InnerStateComponent' || json.type === 'TestComponent' || json.type === 'TestComponentCode') {
        if (window.__TRACELEVEL__ <= 3)
            return json.children[0];
        deleteProps(json)
        return json
    }
    if (json.type === 'ThemeProviderGeneric') {
        if (json.props['theme']) json.props['theme'] = '...'
        return json
    }
    return json
}

function deleteProps(node) {
    if (!node || Array.isArray(node))
        return
    if (typeof node === 'object') {
        ['innerStateComponent', 'CodeComponent', 'setInnerState', 'theme', 'toClassNames',
            'refreshInnerStateComponent', 'sheetOrCreator', '~']
            .forEach(p => delete node[p])
        for (const p in node) {
            if (p==='node') continue
            const val = node[p]
            if (!val) delete node[p]
            else if (Array.isArray(val)) {
                if (p != 'children') continue
                val.forEach(n => deleteProps(n))
            } else if (typeof val === 'object')
                deleteProps(val)
        }
    }
}

export const createSheet = <R extends TSheeter.Shape>(
    creator: () => TSheeter.Sheet<R>,
    call: (res: jest.Matchers<any>) => void,
) => {

}

export const toClassNames = <R extends TSheeter.Shape>(
    descr: string,
    mergedInnerState: TVariants.Query<R>,
    rulesets: TSheeter.ClassNameOrAtomized,
    call: (res: jest.Matchers<any>) => void,
) => {
    const title = (str: String) => `
******************************************
*  ${str}
******************************************
`
    const atomized = toClassNamesWithQuery({ propsCode: { mergedInnerState } }, rulesets)
    const lastWin = platform.applyLastwinsStrategy(atomized)
    const final = platform.finalClassNameStep(lastWin)
    const json = [`
##########################################
##########################################
#
#  ${descr}
#
##########################################
##########################################
`,
    title('QUERY TO STHEET'),
    platform.dumpAtomized(atomized),
    title('APPLY LASTWINS STRATEGY'),
    platform.dumpAtomized(lastWin),
    title(`FINALIZE FOR for web's className or native's style`),
        final,
    ]
    call(expect(json))
}


/*
let { atomized, lastWin, final} = 
atomized.toMatchInlineSnapshot()
lastWin.toMatchInlineSnapshot()
final.toMatchInlineSnapshot()
 */