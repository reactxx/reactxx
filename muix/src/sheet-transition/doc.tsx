import React from 'react'
import { TTransition } from './d-index'
import { TCommonStyles, TVariants, TSheeter } from 'reactxx-typings'
import { toVariantParts } from 'reactxx-core';

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'label'>
    transitions: TSheeter.ShapeMarks<'mobile' | 'tablet'>
}

const tt: TTransition.RulesetCommon<'View'> = {
    margin: '',
    //color: '',
}

const ttt: TCommonStyles.RulesetCommon<'View'> & TVariants.VariantPart<'View', Shape> = {
    margin: 0,
    $transition: {
        //v:false,
        $duration: 200,
        margin: '',
        $native: {
            margin: '',
            color: '', 
            //padding: '',
        }
        //color: '',
    },
    //color: ''
}


const t: TSheeter.RulesetOrAtomized<'View', Shape> = {
    //margin: 0,
    $transition: {
        $duration: 200,
        margin: '',
        color: '',
    },
    //color: ''
}
t.$transition = {
    //$duration: 200,
    margin: '',
    //color: ''
    //x:1,
}


//t.$transition.$native


const sheet1: TSheeter.Sheet<Shape> = {
    root: {
        $transition: {
            $groupName: 'mobile',
            $duration: 400,
            $native: {
                width: '',
            },
            $web: {
                cursor: ''
            },
            //opacity: '',
            color: '',
        }
    },
    label: {

    },
}

const sheet = {
    root: {
        opacity: 0.5,
        $transition: {
            $groupName: 'root', // allow grouping of $transitions for more elements (the same $duration, the same Animation.Value for native etc.)
            opacity: '-50', // '-50' or '50-' or '30-70' or '300' or '200,100' or ',100' or '200,'
            transform: true
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