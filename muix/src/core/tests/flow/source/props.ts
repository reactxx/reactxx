import { TSheeter, TVariants, TComponents } from 'reactxx-typings'
import { getBreakpoints } from 'reactxx-sheet-widths'

import { Shape, ts } from '../shape-def'

export const width: getBreakpoints<Shape> = 
    //'tabletWidth'
    'mobileWidth'
    //'desktopWidth'

export const propsToFlags = (props: TComponents.Props<Shape>) => ({
    isDrawerOpened: props.drawerOpened,
    isDisabled: props.disabled
} as TVariants.WhenFlagQuery<Shape>)

export const defaultProps: TComponents.Props<Shape> = {
    disabled: false,
    drawerOpened: false,
    classes: theme => ({ root: {}, label: {} }),
    classNameX: {},
    styleX: {},
    themedProps: ({ breakpoints: { mobile, tablet, desktop } }) => ({
        breakpoints: { mobileWidth: mobile, tabletWidth: tablet, desktopWidth: desktop }
    })
}

export const cascading: TComponents.Props<Shape> = {
    disabled: false,
    drawerOpened: false,
    classes: { root: {}, label: {} },
    classNameX: {},
    styleX: {}
}

export const props: TComponents.Props<Shape> = {
    disabled: false,
    drawerOpened: true,
    classes: { root: {}, label: {} },
    classNameX: {},
    styleX: {}
}

