import { TSheeter } from 'reactxx-typings'
import { TSBugHelper } from 'reactxx-core';

export const Theme = {
    primary: {
        color: 'green',
    },
}

export interface Shape1 extends TSheeter.ShapeAncestor { }
export const ts1: TSBugHelper<Shape1> = {}
export const sheet1 = ts1.sheetCreator = theme => ts1.sheet = {
    //root: {}
}
export const sheet1_2 = ts1.sheet = {
    //root: {}
}

export interface Shape2 extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root'>
}
export const ts2: TSBugHelper<Shape2> = {}
export const sheet2 = ts2.sheetCreator = theme => ts2.sheet = {
    root: {
        margin: 1,
        //backgroundColor: theme.x,
        $web: {
            cursor: 'pointer'
            //$switch: ts2.sheetSwitch$Web = { }
            //$transitionGroup: ts2.transitionGroup$Web = { }
        },
        //$switch: ts2.sheetSwitchView = { }
        //$transitionGroup: ts2.transitionGroupView = { }
    }
}
export const sheet2_2 = ts2.sheet = {
    root: {
        //$switch: ts2.sheetSwitchView = { }
        //$transitionGroup: ts2.transitionGroupView = { }
    }
}

