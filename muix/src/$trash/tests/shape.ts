import { TCommonStyles } from 'reactxx-typings'
import { ThemeProviderGeneric } from 'reactxx-with-styles'
import { TSBugHelper } from 'reactxx-core'

export interface Props {
    disabled?: boolean
    p1?: string
    p2?: string
    p3?: string
    p4?: string
}
export interface InnerState {
    drawerOpened?: boolean
}


export interface Shape extends TSheeter.ShapeAncestor {
    rulesets: {
        root: 'View',
        label: 'Text',
        nativeOnly: '$NativeText',
        webOnly: '$Web'
    },

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

type t = TSheeter.Sheet<Shape>['root']
type tc = TCommonStyles.RulesetCommon<Shape['common']['root']>
type tn = TCommonStyles.RulesetCommon<Shape['native']['nativeOnly']>
//type tw = TCommonStyles.RulesetCommon<Shape['native']['nativeOnly']>

type TThemeProvider = new () => ThemeProviderGeneric<Shape>;
export const ThemeProvider = ThemeProviderGeneric as TThemeProvider

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



export const ts: TSBugHelper<Shape> = {}
