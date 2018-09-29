import React from 'react'
import { TTransition } from './d-index'
import { TCommonStyles, TVariants, TSheeter } from 'reactxx-typings'
import { toVariantParts, TSBugHelper, getFlagsAll } from 'reactxx-core';
import { getSheetFlags } from 'reactxx-sheet-flags';

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'label'>
    transitions: TSheeter.ShapeMarks<'mobile' | 'tablet'>
    //sheetFlags: TSheeter.ShapeMarks<'disabled'>
}

//https://github.com/Microsoft/TypeScript/issues/27448
interface Low {
}

interface TransitionLow {
    native: { 
        margin: string 
    }
}

const testWRONG: TransitionLow & Low = {
    native: {
        margin: '',
        color: '',  // Object literal may only specify known properties,...ERROR EXPECTED
    }
}

const tsBug: TSBugHelper<Shape> = {}

const sheet1: Shape['$SheetOrCreator'] = theme => tsBug.sheet = {
    root: tsBug.rulesetView = {
        margin: 0,
        $transition: tsBug.transitionView = {
            $groupName: 'mobile',
            $duration: 400,
            $native: tsBug.transitionNativeView = {
                width: '',
                //color: '',
            },
            $web: tsBug.cssProperties = {
                cursor: '',
            },
            opacity: '',
            //color: '',
        },
        //$sheetFlags: {},
        //$sheetFlags: {

        //disabled:{
        //color: '',
        //}
        //}
    },
    label: tsBug.rulesetView = {

    },
}

const sheet = {
    root: {
        opacity: 0.5,
        $transition: {
            $groupName: 'root', // allow grouping of $transitions for more elements (the same $duration, the same Animation.Value for native etc.)
            opacity: '-50', // '-50' or '50-' or '30-70' or '300' or '200,100' or ',100' or '200,'
            transform: ''
        },
        $sheetFlags: {
            active: {
                opacity: 1,
            }
        }
    },
    label: {
        opacity: 1,
        $transitions: {
            $groupName: 'root',
            opacity: '',
        },
        $sheetFlags: {
            active: {
                opacity: 0,
            }
        }
    },
    text: {
        $web: {
            opacity: 0,
            $transition: {
                $duration: 400,
                $easing: '',
                opacity: '',
            },
            ':hover': {
                opacity: 1,
            }
        },
    }
}