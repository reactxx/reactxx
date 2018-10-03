/** @jsx createElement */
import { TSheeter, TCommonStyles } from 'reactxx-typings'
import { traceAtomizedRuleset, atomizeSheet } from 'reactxx-sheeter'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    sheetFlags: TSheeter.ShapeMarks<'disabled' | 'active'>
}

interface ShapeSimple2 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    sheetFlags: TSheeter.ShapeMarks<'disabled'>
}

const sheetSimple2: TSheeter.SheetCreator<ShapeSimple2> = theme => ({
    root: [
        {
            $sheetFlags: {},
            whenFlag2: {}
        },
        { $web: [] }
    ]
})

interface ShapeSimple extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    sheetFlags: TSheeter.ShapeMarks<'disabled'>
}

const sheetSimple: TSheeter.Sheet<ShapeSimple> = {
    root: [
        {
            $sheetFlags: { disabled: { color: 'disabled1' } },
            //$sheetFlags2: { disabled: { color: 'disabled1' }},
            $web: [
                {
                    $sheetFlags: { disabled: { color: 'disabled2' } },
                    ':hover': {
                        ':active': {
                            $sheetFlags: {
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
            //     $sheetFlags: { disabled: [
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
        $sheetFlags: {
            disabled: {
                color: '$sheetFlags|disabled',
            },
        }
    },
    label: {
        $web: {
            color: 'gray',
            ':hover': {
                $mediaq: {},
                $sheetFlags: {
                    disabled: {
                        color: 'label|$sheetFlags|root',
                        $web: [
                            {
                                ':hover':
                                {
                                    $sheetFlags: {},
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

