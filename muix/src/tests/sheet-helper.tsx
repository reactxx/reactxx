import React from 'react'
//import { createSerializer, OutputMapper } from 'enzyme-to-json'
import { RenderResult } from 'react-testing-library'

import { TSheeter, TVariants, TComponents, TWithStyles } from 'reactxx-typings'
import * as WithStyle from 'reactxx-with-styles'
import {
    platform,
    toClassNamesWithQuery,
} from "reactxx-sheeter";
import { initPlatform, mount } from './index'
//import { platform } from 'reactxx-sheet-widths'
import { Shape, theme } from './shape'
//import { ReactWrapper } from 'enzyme';

const doMock = (data: string) => {
    const res: React.SFC<any> = props => <div data={data.toUpperCase()} {...props} children={(props && props.children) || null} />
    res.displayName = data
    return res
}

jest.mock('react-native', () => ({
    Text: doMock('Text'),
    View: doMock('View'),
    ScrollView: doMock('ScrollView'),
    Image: doMock('Image'),
    TouchableWithoutFeedback: doMock('TouchableWithoutFeedback'),
    Animated: {
        Text: doMock('AnimatedText'),
        View: doMock('AnimatedView'),
        Image: doMock('AnimatedImage'),
        createAnimatedComponent: comp => doMock('Animated')
    },
}))

jest.mock('@expo/vector-icons', () => ({
    MaterialCommunityIcons: doMock('MaterialCommunityIcons')
}))

export const ReactAny: React.SFC<any> = doMock('ReactAny')

export const setActWidth = (width: number) => {
    actWidth = width;
    platform.actWidth = getActWidth
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

// export const adjustSnashotSerializer = () =>
//     expect.addSnapshotSerializer(createSerializer({ map: filter, noKey: true }) as any);

export const traceComponentEx = (
    isWeb: boolean,
    traceOptions: TraceOptions,
    sheet: TTyped.SheetOrCreator<Shape>,
    comp: TComponents.SFCCode<Shape>,
    node: (Comp: TComponents.ComponentClass<Shape>) => React.ReactElement<{}>,
    componentOptions?: TWithStyles.ComponentOptions<Shape>,
    overrideOptions?: TWithStyles.ComponentOptions<Shape>,
    finished?: (wr: HTMLElement, Comp: React.ComponentType) => void,
) => {
    initPlatform(isWeb)
    const { traceLevel = 1, actWidth } = traceOptions
    WithStyle.registerTheme(null, theme)
    window.__TRACELEVEL__ = traceLevel
    const Comp = WithStyle.withStylesCreator
        (sheet, comp, { ...componentOptions || {}, displayName: 'TestComponent' })
        (overrideOptions)

    if (actWidth) setActWidth(actWidth)

    //adjustSnashotSerializer()
    //expect.addSnapshotSerializer(createSerializer({ map: filter, noKey: true }) as any);

    const nodeComp = node(Comp)
    let wrapper = mount(nodeComp)
    let { color, backgroundColor } = (wrapper.firstElementChild as HTMLElement).style
    //  JEST and ENZYME:
    if (finished)
        finished(wrapper, Comp)
    else {
        expect(wrapper).toMatchSnapshot();

    }
}

// https://github.com/adriantoine/enzyme-to-json/issues/110
//const filter: OutputMapper = json => deleteProps(json)

function deleteProps(json) {
    if (!json)
        return json

    if (Array.isArray(json))
        return json.map(it => deleteProps(it))

    if (typeof json !== 'object')
        return json

    json = { ...json }

    if (json.type === 'InnerStateComponent' || isHOC(json)) { //}.type === 'TestComponent' || json.type === 'TestComponentCode') {

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
        if (!val && val !== '' && val !== 0 && val !== false)
            delete json[p]
        else if (val && (val._reactInternalFiber || val.stateNode || val.memoizedProps))
            delete json[p]
        else
            json[p] = deleteProps(val)
    }

    return json
}

const isHOC = json => {
    const type = json && json.node && json.node.type && json.node.type['~~']
    return type === 'comp' || type === 'compCode'
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
    const final = platform.finalizeClassName(lastWin)
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
