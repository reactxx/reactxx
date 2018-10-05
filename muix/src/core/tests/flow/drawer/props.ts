import { TSheeter, TVariants, TComponents } from 'reactxx-typings'
import { getBreakpoints } from 'reactxx-sheet-widths'

import { Shape, ts } from 'reactxx-core/tests/flow/shape'

export const width: getBreakpoints<Shape> = 
    //'tabletWidth'
    'mobileWidth'
    //'desktopWidth'

export const getFlags = (props: TComponents.Props<Shape>, state: TComponents.InnerState<Shape>) => ({
    isDrawerOpened: state.drawerOpened,
    isDrawerClosed: !state.drawerOpened
} as TVariants.SheetFlags<Shape>)

export const defaultProps: TComponents.Props<Shape> = {
    classes: theme => ({ root: {}, label: {} }),
    classNameX: {},
    styleX: {},
    themedProps: ({ breakpoints: { mobile, tablet, desktop } }) => ({
        breakpoints: { mobileWidth: mobile, tabletWidth: tablet, desktopWidth: desktop }
    }),
}

export const cascading: TComponents.Props<Shape> = {
    classes: { root: {}, label: {} },
    classNameX: {},
    styleX: {}
}

export const props: TComponents.Props<Shape> = {
    classes: { root: {}, label: {} },
    classNameX: {},
    styleX: {}
}

