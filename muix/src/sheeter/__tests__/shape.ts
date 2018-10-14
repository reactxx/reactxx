import { TSheeter } from 'reactxx-typings'
import { TSBugHelper } from 'reactxx-core'

export interface Props {
}
export interface InnerState {
    drawerOpened?: boolean
}


export interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root'> & TSheeter.ShapeTexts<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    style: 'View'

    theme: typeof Theme
    cases: TSheeter.ShapeMarks<'isDrawerClosed' | 'isDrawerOpened'>
    breakpoints: TSheeter.ShapeMarks<'tabletWidth' | 'mobileWidth' | 'desktopWidth'>
    transitionGroups: TSheeter.ShapeMarks<'leftDrawer'>

    props: Props
    innerState: InnerState
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
