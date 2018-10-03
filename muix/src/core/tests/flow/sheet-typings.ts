import { ts } from './shape-def'

export const sheet = ts.sheetCreator = theme => ts.sheet = {
    root: ts.view = {
        margin: 4,
        //color: 'red',
        $web: ts.web = {
            cursor: 'pointer',
            //x: 1,
            ':hover': {
                ':active': {
                    $sheetFlags: ts.sheetFlags$Web = {
                        isDisabled: [{
                            color: 'red',
                            //x: 1,
                        }],
                    },

                }
            },
            // ':active': [{
            // }],
            $sheetFlags: ts.sheetFlags$Web = {
                isDisabled: [{
                    color: 'red',
                    cursor: 'pointer',
                    //x: 1,
                }],
                tabletWidth: {
                    color: 'red',
                    cursor: 'pointer',
                    //x: 1,
                }
            },
            $transitionGroup: ts.transitionGroup$Web = {
                $name: 'tabletDrawer', // allow grouping of $transitions for more elements (the same Animation.Value for native etc.)
                opacity: [1, 0],
                color: ['', ''],
                //x: 1,
            },
        },
        $transitionGroup: ts.transitionGroupView = {
            $name: 'mobileDrawer',
            //$name: 'xmobile',
            opacity: [1, 0],
            //color: ['', ''],
        },
        $native: ts.nativeView = [
            {
                margin: 4,
                //color: 'red',
            },
            {
                padding: 4,
                //cursor: 'pointer',
            },
        ],
        $sheetFlags: ts.sheetFlagsView = {
            mobileWidth: {},
            isDrawerOpened: {
                //color: 'red',
            },
            //isMobileWidthx: {},
        },
    },
    label: ts.text = [{
        margin: 0,
        color: theme.primary.color,
        //backgroundColor: theme.primary.backgroundx,
        //x: 1,
        $web: ts.web = [{
            color: 'gray',
            //x: 1,
            $sheetFlags: ts.sheetFlagsText = {
                isDisabled: [{
                    color: 'red',
                    //x: 1,
                }],
            },
        }],
        $transitionGroup: ts.transitionGroupText = {
            $name: 'tabletDrawer',
            //$name: 'xmobile',
            opacity: [1, 0],
            color: ['', ''],
            //x1: ['', ''],
        },
    }],
    webOnly: {
        //margin: 4,
        $web: ts.web = {
            color: 'red',
            //x: 1,
            $sheetFlags: ts.sheetFlagsText = {
                isDisabled: [{
                    color: 'red',
                    //x: 1,
                    $transitionGroup: ts.transitionGroup$Web = {
                        $name: 'tabletDrawer',
                        //$name: 'xmobile'
                        color: ['', ''],
                        //x: [0, 0]
                    },
                }],
            },
            $transitionGroup: ts.transitionGroup$Web = {
                $name: 'tabletDrawer',
                color: ['', ''],
                //x: [0, 0]
            },
        },
    },
    nativeOnly: {
        //margin: 4,
        $native: ts.nativeView = {
            margin: 20,
            //color: 'red',
            $sheetFlags: ts.sheetFlagsView = {
                isDisabled: [{
                    margin: 4,
                    //color: 'red',
                }],
            },
            $transitionGroup: ts.transitionGroupView = {
                $name: 'tabletDrawer',
                opacity: [0, 1],
                left: [0, 200],
                //color: ['', ''],
            },
        },
    }

}