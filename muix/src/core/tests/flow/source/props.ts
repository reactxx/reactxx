import { TComponents } from 'reactxx-typings'

import { Shape } from '../shape-def'

export const defaultProps: TComponents.Props<Shape> = {
    disabled: false,
    active: true,
    classes: theme => ({root: {}, label: {}}),
    classNameX: {},
    styleX: {},
    themedProps: ({breakpoints: {mobile, tablet, desktop}}) => ({
        breakpoints: {mobileWidth: mobile, tabletWidth: tablet, desktopWidth: desktop}
    })
}

export const props: TComponents.Props<Shape> = {
    disabled: false,
    active: true,
    classes: {root: {}, label: {}},
    classNameX: {},
    styleX: {}
}

export const cascading: TComponents.Props<Shape> = {
    disabled: false,
    active: true,
    classes: {root: {}, label: {}},
    classNameX: {},
    styleX: {}
}
