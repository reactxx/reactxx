/** @jsx createElement */
import { TSheeter, TCommonStyles } from 'reactxx-typings'
import { traceAtomizedRuleset, atomizeSheet } from 'reactxx-sheeter'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    cases: TSheeter.ShapeMarks<'disabled' | 'active'>
}

interface ShapeSimple2 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    cases: TSheeter.ShapeMarks<'disabled'>
}

const sheetSimple2: TSheeter.SheetCreator<ShapeSimple2> = theme => ({
    root: [
        {
            $sheetSwitch: {},
            whenFlag2: {}
        },
        { $web: [] }
    ]
})

interface ShapeSimple extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    cases: TSheeter.ShapeMarks<'disabled'>
}

const sheetSimple: TSheeter.Sheet<ShapeSimple> = {
    root: [
        {
            $sheetSwitch: { disabled: { color: 'disabled1' } },
            //$sheetSwitch2: { disabled: { color: 'disabled1' }},
            $web: [
                {
                    $sheetSwitch: { disabled: { color: 'disabled2' } },
                    ':hover': {
                        ':active': {
                            $sheetSwitch: {
                                disabled: [
                                    { color: 'disabled3' },
                                    { margin: 15 }
                                ]
                            },
                            color: 'root',
                        }
                    },
                    margin: 20,
                },
                {
                    padding: 30
                }
            ],
            // $native: [{
            //     $sheetSwitch: { disabled: [
            //         { color: 'disabled4' },
            //         { margin: 15 }
            //     ] },
            //     color: 'root',
            // }]
        },
        {
            padding: 15
        }

    ]
}

export const runTest = () => {

    const compSheet = atomizeSheet<ShapeSimple>(sheetSimple, null)

    let trace = traceAtomizedRuleset(compSheet.root)
    //trace = traceAtomizedRuleset(compSheet.label)
}

const style = {
    color: 'red'
}
const sheet: TSheeter.Sheet<Shape> = {
    root: {
        $web: {
            ':hover': {
                color: 'root',
            }
        },
        margin: 4,
        $sheetSwitch: {
            disabled: {
                color: '$sheetSwitch|disabled',
            },
        }
    },
    label: {
        $web: {
            color: 'gray',
            ':hover': {
                $mediaq: {},
                $sheetSwitch: {
                    disabled: {
                        color: 'label|$sheetSwitch|root',
                        $web: [
                            {
                                ':hover':
                                {
                                    $sheetSwitch: {},
                                    ':active': {},
                                    cursor: 'pointer',
                                }

                            },
                            {
                                margin: 10
                            }
                        ],
                    },
                }
            },

        }
    },
    webOnly: {
        $web: {
            color: 'webOnly|$web',
            ':hover': {
                color: 'webOnly|$web|:hover',
                $mediaq: {
                    '640': {
                        color: 'webOnly|$web|:hover|$mediaq|640'
                    }
                },

            },

        }
    },
    nativeOnly: {
        $native: {
            margin: 20,
        }
    },
}

