import { TTyped } from 'reactxx-typings';

export interface Props {
    disabled?: boolean
    p1?: string
    p2?: string
    p3?: string
    p4?: string
}
// export interface InnerState {
//     drawerOpened?: boolean
// }
export interface Shape extends TTyped.ShapeAncestor {
    rulesets: {
        root: 'View',
        label: 'Text',
        nativeOnly: '$NativeText',
        webOnly: '$Web'
    },
    sheet: {
        root: 'V',
        label: 'T',
        nativeOnly: '$T',
        webOnly: '$W'
    },

    style: 'View'

    theme: typeof theme
    //cases: TSheeter.ShapeMarks<'isDisabled' | 'isClosed' | 'isOpened'>
    //widths: TSheeter.ShapeMarks<'tabletWidth' | 'mobileWidth' | 'desktopWidth'>
    //transitionGroups: TSheeter.ShapeMarks<'leftDrawer'>

    props: Props
    //innerState: InnerState
}

export type Theme = TTyped.getTheme<Shape>

export const theme = {
    primary: {
        normal: {
            color: 'white',
            backgroundColor: 'darkgreen',
        },
        disabled: {
            color: 'lightgray',
            backgroundColor: 'lightgreen',
        }
    },
    secondary: {
        normal: {
            color: 'black',
            backgroundColor: 'lightblue',
        },
        disabled: {
            color: 'darkgray',
            backgroundColor: 'blue',
        }
    },
    breakpoints: {
        mobile: '-640',
        tablet: '640-1024',
        desktop: '1024-'
    }
}
