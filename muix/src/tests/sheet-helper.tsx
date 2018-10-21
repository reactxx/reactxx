import React from 'react'
import { TSheeter, TVariants, TComponents } from 'reactxx-typings'
import * as WithStyle from 'reactxx-with-styles'
import {
    toClassNamesWithQuery,
    platform,
} from "reactxx-sheeter";
import { initPlatform, mount } from './index'
import { Shape } from './shape'

export const traceComponent = (isWeb: boolean, node: React.ReactElement<{}>, codeDisplayName?: string) => {
    initPlatform(true)
    let comp = mount(node)
    if (window.__TRACELEVEL__ <= 2)
        while (true) {
            if (!comp) break
            if (comp.name() === codeDisplayName) {
                comp = comp.children()
                break
            }
            comp = comp.childAt(0)
        }
    expect(comp).toMatchSnapshot();
}

export const traceComponentEx = (
    isWeb: boolean,
    sheet: TSheeter.PartialSheet<Shape>,
    comp: TComponents.SFCCode<Shape>,
    node: (Comp: TComponents.ComponentClass<Shape>) => React.ReactElement<{}>
) => {
    const Comp = WithStyle.withStylesCreator({ ...defaultSheet, ...sheet }, comp)({ displayName: 'TestComponent' })
    traceComponent(isWeb, node(Comp), 'TestComponentCode')
}

const defaultSheet: TSheeter.Sheet<Shape> = {
    root: {},
    label: {},
    webOnly: {},
    nativeOnly: {},

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