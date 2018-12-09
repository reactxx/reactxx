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
    sheet: {
        root: 'V',
        label: 'T',
        nativeOnly: '$T',
        webOnly: '$W'
    },

    props: Props
    sheetQuery: {}

    theme: typeof theme
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
