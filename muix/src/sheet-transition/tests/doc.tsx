import React from 'react'

import { TCommonStyles, TVariants, TSheeter, TComponents } from 'reactxx-typings'
import { atomizeVariants } from 'reactxx-sheeter'
import { TTransition } from 'reactxx-sheet-transition'
import { getCases } from 'reactxx-sheet-switch';
import { TSBugHelper, getFlagsAll } from 'reactxx-core';

interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root' | 'label'> & TSheeter.ShapeTexts<'text'>
    style: 'View'
    transitionGroups: TSheeter.ShapeMarks<'mobile' | 'tablet'>
    cases: TSheeter.ShapeMarks<'active'>
}

interface Shape2 extends TSheeter.ShapeAncestor {
}


const Comp: TComponents.ComponentClass<Shape> = null
const Comp2: TComponents.ComponentClass<Shape2> = null

const Test1 = <Comp styleX={{ margin: 0 }} />
const Test2 = <Comp2 />

export type Wrapper<T> = {
    [P in keyof T]: T[P]
}

type Sht = Record<'root', {
    $transitionGroup?: TTransition.Group<'View', Shape>
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

const sheet2: TSheeter.Sheet<Shape> = ts.sheet = {
    root: {
        //color: '',
        opacity: 0.5,
        transform: {
            scale: 1
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
            transform: {
                scale: [1, 1.2],
                translateX: [-100, 0],
                $interval: '20-30',
            },
            //color: ['', ''],
        },
        $sheetSwitch: {
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
                opacity: [0, 1],
                color: ['red', 'green']
            },
            ':hover': {
                opacity: 1,
                color: 'blue',
            }
        },
    }
}

const innerState = {
    drawerOpened: true,
    $sheetSwitch: {
        tabletWidth: false,
        desktopWidth: false,
        mobileWidth: true,
        isDrawerClosed: true,
        isDrawerOpened: false,
    },
    $anyOther: {},
}

type InnerState = any
type Query = any
let setInnerState: (innerState: InnerState, oldQuery: Query) => Query

