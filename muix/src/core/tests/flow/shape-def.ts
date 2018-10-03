// import React from 'react'

// import { atomizeRuleset } from 'reactxx-sheeter'
// import { TTransition } from 'reactxx-sheet-transition'
// import { getSheetFlags } from 'reactxx-sheet-flags';

import { TSheeter } from 'reactxx-typings'
import { TSBugHelper } from 'reactxx-core'

export interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root'> & TSheeter.ShapeTexts<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    style: 'View'

    theme: typeof Theme
    sheetFlags: TSheeter.ShapeMarks<'isDisabled' | 'isActive'>
    breakpoints: TSheeter.ShapeMarks<'isTabletWidth' | 'isMobileWidth' | 'isDesktopWidth'>
    transitionGroups: TSheeter.ShapeMarks<'tabletDrawer' | 'mobileDrawer'>
}

export const Theme = {
    primary: {
        color: 'green',
        background: 'white',
        disabled: {
            color: 'lightgreen',
            background: 'lightgray',
        }
    },
    secondary: {
        color: 'red',
        background: 'white',
        disabled: {
            color: 'lightred',
            background: 'lightgray',
        }
    },
    breakpoints: {
        mobile: '-640',
        tablet: '640-1024',
        desktop: '1024-'
    }
}

export const ts: TSBugHelper<Shape> = {}

const sheet: Shape['$SheetCreator'] = theme => ts.sheet = {
    root: {
        margin: 4,
        $sheetFlags: {
            isDisabled: [{
                //color: '$sheetFlags|disabled',
            }],
        },
        $web: [{
            $sheetFlags: {
                isDisabled: [{
                    //color: '$sheetFlags|disabled',
                }],
            },
        }],
    },
    label: {
        $web: {
            color: 'gray',
            $sheetFlags: {
                isDisabled: [{
                    color: '$sheetFlags|disabled',
                }],
            },
        },
        //margin:0
    },
    webOnly: {
    },
    nativeOnly: {
        $native: {
            margin: 20,
        }
    },
}
