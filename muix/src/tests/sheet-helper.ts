import { TSheeter, TVariants } from 'reactxx-typings'
import {
    toClassNamesWithQuery,
    platform,
} from "reactxx-sheeter";

export const createSheet = <R extends TSheeter.Shape>(
    creator: () => TSheeter.Sheet<R>,
    call: (res: jest.Matchers<any>) => void,
) => {

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
    const atomized = toClassNamesWithQuery({ sheetQuery }, rulesets)
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