import { TSheeter } from 'reactxx-typings'
import { ThemeProviderGeneric } from 'reactxx-with-styles'
import { TSBugHelper } from 'reactxx-core'

export interface Props {
    disabled?: boolean
}
export interface InnerState {
    drawerOpened?: boolean
}


export interface Shape extends TSheeter.ShapeAncestor {
    common: TSheeter.ShapeViews<'root'> & TSheeter.ShapeTexts<'label'>
    native: TSheeter.ShapeViews<'nativeOnly'>
    web: TSheeter.ShapeMarks<'webOnly'>
    style: 'View'

    theme: typeof theme
    cases: TSheeter.ShapeMarks<'isDisabled' | 'isClosed' | 'isOpened'>
    widths: TSheeter.ShapeMarks<'tabletWidth' | 'mobileWidth' | 'desktopWidth'>
    transitionGroups: TSheeter.ShapeMarks<'leftDrawer'>

    props: Props
    innerState: InnerState
}

type TThemeProvider = new () => ThemeProviderGeneric<Shape>;
export const ThemeProvider = ThemeProviderGeneric as TThemeProvider

export const theme = {
    primary: {
        normal: {
            color: 'darkgreen',
            background: 'white',
        },
        disabled: {
            color: 'lightgreen',
            background: 'lightgray',
        }
    },
    secondary: {
        normal: {
            color: 'lightblue',
            background: 'black',
        },
        disabled: {
            color: 'blue',
            background: 'darkgray',
        }
    },
    breakpoints: {
        mobile: '-640',
        tablet: '640-1024',
        desktop: '1024-'
    }
}

export const ts: TSBugHelper<Shape> = {}
