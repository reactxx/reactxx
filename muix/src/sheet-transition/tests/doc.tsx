import React from 'react'
import { TTransition } from 'reactxx-sheet-transition/d-index'
import { TCommonStyles, TVariants, TSheeter, TComponents } from 'reactxx-typings'
import { atomizeVariants, TSBugHelper, getFlagsAll } from 'reactxx-core';
import { getSheetFlags } from 'reactxx-sheet-flags';

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'label'> & TSheeter.ShapeTexts<'text'>
    transitionGroups: TSheeter.ShapeMarks<'mobile' | 'tablet'>
    sheetFlags: TSheeter.ShapeMarks<'active'>
}

interface Shape2 extends TSheeter.ShapeAncestor {
}


const Comp: TComponents.SFC<Shape> = props => null
const Comp2: TComponents.SFC<Shape2> = props => null

const Test1 = <Comp transitionGroups={{ mobile: { duration: 200 }, tablet: { duration: 200 } }} />
const Test2 = <Comp2 $web={{}} />

export type Wrapper<T> = {
    [P in keyof T]: T[P]
}

type Sht = Record<'root', {
    $transitionGroup?: TTransition.TransitionGroup<'View', Shape>
}>

const sht: Sht = {
    root: {
        $transitionGroup: {
            $name: 'mobile',
            //color: ['', '']
        }
    }
}

const grp: TSheeter.Ruleset<'View', Shape> = {
    $transitionGroup: {
        $name: 'mobile',
        //color: ['', '']
    }
}
//const grp: TSheeter.Ruleset<'View', Shape> = {


//https://github.com/Microsoft/TypeScript/issues/27448
const ts: TSBugHelper<Shape> = {}

const sheet2: TSheeter.Sheet<Shape> = {
    root: {
        //color: '',
        opacity: 0.5,
        transform: {
            scale: 100,
        },
        $native: {
            //color:''
        },
        $web: {
            //x:1
        },
        $transitionGroup: ts.transitionGroupView = {
            $name: 'mobile', // allow grouping of $transitions for more elements (the same Animation.Value for native etc.)
            opacity: [1, 0],
            //color: ['', ''],
        }, 
        $sheetFlags: ts.sheetFlagsView = {
            active: {
                //color: '',
                $transitionGroup: ts.transitionGroupView = {
                    $name: 'mobile',
                    $open: true,
                    //color: ['',''],
                }
            }
        },
    },
    label: {
        //color:'',
        $transitionGroup: ts.transitionGroupView = {
            opacity: [1, 0],
            $name: 'mobile',
        },
    },
    text: {
        $web: {
            opacity: 0,
            color: 'red',
            $transition: ts.transitionText = {
                $duration: 400,
                $easing: '',
                $props: ['opacity', 'color'],
            },
            ':hover': {
                opacity: 1,
                color: 'blue',
            }
        },
    }
}