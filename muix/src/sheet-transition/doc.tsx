import React from 'react'
import { TTransition } from './d-index'
import { TCommonStyles, TVariants, TSheeter } from 'reactxx-typings'
import { toVariantParts, TSBugHelper, getFlagsAll } from 'reactxx-core';
import { getSheetFlags } from 'reactxx-sheet-flags';

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'label'> & TSheeter.ShapeTexts<'text'>
    transitions: TSheeter.ShapeMarks<'mobile' | 'tablet'>
    sheetFlags: TSheeter.ShapeMarks<'active'>
}

//https://github.com/Microsoft/TypeScript/issues/27448
const tsBug: TSBugHelper<Shape> = {}

const sheet2: Shape['$SheetOrCreator'] = theme => tsBug.sheet = {
    root: tsBug.rulesetView = {
        opacity: 0.5,
        transform: {
            scale: 100,
        },
        $transition: tsBug.transitionView = {
            $groupName: 'mobile', // allow grouping of $transitions for more elements (the same $duration, the same Animation.Value for native etc.)
            opacity: '-50', // '-50' or '50-' or '30-70' or '300' or '200,100' or ',100' or '200,'
            transform: '50-'
        },
        $sheetFlags: {
            active: {
                opacity: 1,
                transform: {
                    scale: 120
                }
            }
        }
    },
    label: tsBug.rulesetView = {
        opacity: 1,
        $transition: tsBug.transitionView = {
            $groupName: 'mobile',
            opacity: '',
        },
        $sheetFlags: {
            active: {
                opacity: 0,
            }
        }
    },
    text: tsBug.rulesetText = {
        $web: {
            opacity: 0,
            color: 'red',
            $transition: tsBug.transitionText = {
                $duration: 400,
                $easing: '',
                opacity: '',
                color: ''
            },
            ':hover': {
                opacity: 1,
                color: 'blue',
            }
        },
    }
}