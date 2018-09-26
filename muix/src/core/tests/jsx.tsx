/** @jsx createElement */
import { TSheeter, TCommonStyles } from 'reactxx-typings'
import { traceAtomizedRuleset, atomizeSheet } from 'reactxx-sheeter'

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'> & TSheeter.ShapeViews<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeWeb<'webOnly'>
    sheetFlags: TSheeter.ShapeFlags<'disabled' | 'active'>
}

interface ShapeSimple2 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    sheetFlags: TSheeter.ShapeFlags<'disabled'>
}

const sheetSimple2: TSheeter.SheetCreator<ShapeSimple2> = theme => ({
    root: [
        {
            $whenFlag: {},
            whenFlag2: {}
        },
        { $web: [] }
    ]
})

interface ShapeSimple extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeTexts<'root'>
    sheetFlags: TSheeter.ShapeFlags<'disabled'>
}

const sheetSimple: TSheeter.Sheet<ShapeSimple> = {
    root: [
        {
            $whenFlag: { disabled: { color: 'disabled1' } },
            //$whenFlag2: { disabled: { color: 'disabled1' }},
            $web: [
                {
                    $whenFlag: { disabled: { color: 'disabled2' } },
                    ':hover': {
                        ':active': {
                            $whenFlag: {
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
            //     $whenFlag: { disabled: [
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
        $whenFlag: {
            disabled: {
                color: '$whenFlag|disabled',
            },
        }
    },
    label: {
        $web: {
            color: 'gray',
            ':hover': {
                $mediaq: {},
                $whenFlag: {
                    disabled: {
                        color: 'label|$whenFlag|root',
                        $web: [
                            {
                                ':hover':
                                {
                                    $whenFlag: {},
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

