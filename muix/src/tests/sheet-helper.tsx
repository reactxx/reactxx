import React from 'react'
import { createSerializer, OutputMapper } from 'enzyme-to-json'


import { TSheeter, TVariants, TComponents, TWithStyles } from 'reactxx-typings'
import * as WithStyle from 'reactxx-with-styles'
import {
    toClassNamesWithQuery,
    globalOptions,
} from "reactxx-sheeter";
import { initPlatform, mount } from './index'
import { platform, onWidthChanged } from 'reactxx-sheet-widths'
import { Shape, theme } from './shape'
import { ReactWrapper } from 'enzyme';


export const ReactAny: React.SFC<any> = ({ children }) => children || null
ReactAny.displayName = 'ReactAny'

export const setActWidth = (width: number) => {
    actWidth = width;
    platform.actWidth = getActWidth
    //onWidthChanged()
}
let actWidth = 1024
const getActWidth = () => actWidth

window.matchMedia = jest.fn().mockImplementation(query /*e.g. '(min-width: 123px)'*/ => ({
    addListener: jest.fn(),
}))

export interface TraceOptions {
    traceLevel?: 1 | 2 | 3 | 4 | 5
    actWidth?: number
}

export const traceComponentEx = (
    isWeb: boolean,
    traceOptions: TraceOptions,
    sheet: TSheeter.SheetOrCreator<Shape>,
    comp: TComponents.SFCCode<Shape>,
    node: (Comp: TComponents.ComponentClass<Shape>) => React.ReactElement<{}>,
    componentOptions?: TWithStyles.ComponentOptions<Shape>,
    finished?: (wr: ReactWrapper, Comp: React.ComponentType) => void,
) => {
    initPlatform(isWeb)
    const { traceLevel = 1, actWidth } = traceOptions as TraceOptions
    globalOptions.namedThemes[WithStyle.defaultThemeName] = theme
    window.__TRACELEVEL__ = traceLevel
    const Comp = WithStyle.withStylesCreator(sheet, comp)({ ...componentOptions || {}, displayName: 'TestComponent' })

    if (actWidth) setActWidth(actWidth)
    //  JEST and ENZYME:
    let wrapper = mount(node(Comp))

    expect.addSnapshotSerializer(createSerializer({ map: filter, noKey: true }) as any);
    expect(wrapper).toMatchSnapshot();
    if (finished) finished(wrapper, Comp)
}

let count = 0

// https://github.com/adriantoine/enzyme-to-json/issues/110
const filter: OutputMapper = json => {
    count = 0
    return deleteProps(json)

    if (!json || Array.isArray(json))
        return json

    if (json.type === 'InnerStateComponent' || json.type === 'TestComponent' || json.type === 'TestComponentCode') {
        switch (window.__TRACELEVEL__) {
            case 3: delete json.props; break
            case 4: delete json.props.pipelineState; delete json.props.pipeState; break
            case 5: break
            default: return json.children[0];
        }
        return json
    }

    if (typeof json !== 'object')
        return json

    const newJSON = { ...json }
    for (const p in newJSON) {
        if (p === 'node') continue
        if (deletePropsDir[p])
            delete newJSON[p]
        const val = newJSON[p]
        if (!val && val !== '' && val !== 0)
            delete newJSON[p]
        // else if (Array.isArray(val)) {
        //     if (p != 'children') continue
        //     val.forEach(n => deleteProps(n))
        // } else if (typeof val === 'object')
        //     deleteProps(val)
    }
    return newJSON


    // deleteProps(json)

    // if (json.type === 'InnerStateComponent' || json.type === 'TestComponent' || json.type === 'TestComponentCode') {
    //     switch (window.__TRACELEVEL__) {
    //         case 3: delete json.props; break
    //         case 4: delete json.props.pipelineState; delete json.props.pipeState; break
    //         case 5: break
    //         default: return json.children[0];
    //     }
    // }
    // return json
}

function deleteProps(json) {
    count++
    if (!json)
        return json

    if (Array.isArray(json))
        return json.map(it => deleteProps(it))
    //     json.forEach((it, idx) => {
    //         json[idx] = deleteProps(it)
    //     })
    //     return json
    // }

    if (typeof json !== 'object')
        return json

    json = { ...json }

    if (json.type === 'InnerStateComponent' || json.type === 'TestComponent' || json.type === 'TestComponentCode') {

        switch (window.__TRACELEVEL__) {
            case 3: delete json.props; break
            case 4:
                json.props = { ...json.props }
                delete json.props.pipelineState; delete json.props.pipeState;
                break
            case 5: break
            default:
                return json.children && deleteProps(json.children[0])
        }
    }

    for (const p in json) {
        if (deletePropsDir[p]) {
            delete json[p]
            continue
        }
        const val = json[p]
        if (!val && val !== '' && val !== 0 && val!==false)
            delete json[p]
        else if (val && (val._reactInternalFiber || val.stateNode || val.memoizedProps))
            delete json[p]
        else 
            json[p] = deleteProps(val)
    }

    return json
}

function deleteProps_(node) {
    if (!node || Array.isArray(node))
        return
    if (typeof node === 'object') {
        for (const p in node) {
            if (p === 'node') continue
            if (deletePropsDir[p]) delete node[p]
            const val = node[p]
            if (!val && val !== '' && val !== 0 && val!==false) delete node[p]
            else if (Array.isArray(val)) {
                if (p != 'children') continue
                val.forEach(n => deleteProps(n))
            } else if (typeof val === 'object')
                deleteProps(val)
        }
    }
}
const deletePropsDir = {
    innerStateComponent: true, CodeComponent: true, setInnerState: true, theme: true,
    toClassNames: true, updateInnerStateComponent: true, sheetOrCreator: true, '~': true
}

export const toClassNames = <R extends TSheeter.Shape>(
    descr: string,
    sheetQuery: TVariants.Query<R>,
    rulesets: TSheeter.ClassNameOrAtomized,
    call: (res: jest.Matchers<any>) => void,
) => {
    const title = (str: String) => `
******************************************
*  ${str}
******************************************
`
    const atomized = toClassNamesWithQuery({ propsCode: { sheetQuery } }, rulesets)
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
