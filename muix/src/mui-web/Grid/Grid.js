//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// A grid component using the following libs as inspiration.
//
// For the implementation:
// - http://v4-alpha.getbootstrap.com/layout/flexbox-grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import { keys as breakpointKeys } from "../styles/createBreakpoints";
import requirePropFactory from "../utils/requirePropFactory";
const GUTTERS = [0, 8, 16, 24, 32, 40];
const GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function generateGrid(globalStyles, theme, breakpoint) {
  const styles = {};
  GRID_SIZES.forEach(size => {
    const key = `grid-${breakpoint}-${size}`;

    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
      return;
    }

    if (size === "auto") {
      styles[key] = {
        flexBasis: "auto",
        flexGrow: 0,
        maxWidth: "none"
      };
      return;
    } // Only keep 6 significant numbers.

    const width = `${Math.round((size / 12) * 10e6) / 10e4}%`; // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41

    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    };
  }); // No need for a media query for the first size.

  if (breakpoint === "xs") {
    Object.assign(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateGutter(theme, breakpoint) {
  const styles = {};
  GUTTERS.forEach((spacing, index) => {
    if (index === 0) {
      // Skip the default style.
      return;
    }

    styles[`spacing-${breakpoint}-${spacing}`] = {
      ...toAtomic("margin", -spacing / 2),
      width: `calc(100% + ${spacing}px)`,
      //'& > $item': {
      "& > .grid_item": {
        ...toAtomic("padding", spacing / 2)
      }
    };
  });
  return styles;
}

const styles = theme => ({
  /* Styles applied to the root element if `container={true}`. */
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },

  /* Styles applied to the root element if `item={true}`. */
  item: {
    ...toAtomic("margin", "0"),
    boxSizing: "border-box",
    NAME$grid_item: true
  },

  /* Styles applied to the root element if `zeroMinWidth={true}`. */
  zeroMinWidth: {
    minWidth: 0
  },

  /* Styles applied to the root element if `direction="column"`. */
  "direction-xs-column": {
    flexDirection: "column"
  },

  /* Styles applied to the root element if `direction="column-reverse"`. */
  "direction-xs-column-reverse": {
    flexDirection: "column-reverse"
  },

  /* Styles applied to the root element if `direction="rwo-reverse"`. */
  "direction-xs-row-reverse": {
    flexDirection: "row-reverse"
  },

  /* Styles applied to the root element if `wrap="nowrap"`. */
  "wrap-xs-nowrap": {
    flexWrap: "nowrap"
  },

  /* Styles applied to the root element if `wrap="reverse"`. */
  "wrap-xs-wrap-reverse": {
    flexWrap: "wrap-reverse"
  },

  /* Styles applied to the root element if `alignItems="center"`. */
  "align-items-xs-center": {
    alignItems: "center"
  },

  /* Styles applied to the root element if `alignItems="flex-start"`. */
  "align-items-xs-flex-start": {
    alignItems: "flex-start"
  },

  /* Styles applied to the root element if `alignItems="flex-end"`. */
  "align-items-xs-flex-end": {
    alignItems: "flex-end"
  },

  /* Styles applied to the root element if `alignItems="baseline"`. */
  "align-items-xs-baseline": {
    alignItems: "baseline"
  },

  /* Styles applied to the root element if `alignContent="center"`. */
  "align-content-xs-center": {
    alignContent: "center"
  },

  /* Styles applied to the root element if `alignContent="flex-start"`. */
  "align-content-xs-flex-start": {
    alignContent: "flex-start"
  },

  /* Styles applied to the root element if `alignContent="flex-end"`. */
  "align-content-xs-flex-end": {
    alignContent: "flex-end"
  },

  /* Styles applied to the root element if `alignContent="space-between"`. */
  "align-content-xs-space-between": {
    alignContent: "space-between"
  },

  /* Styles applied to the root element if `alignContent="space-around"`. */
  "align-content-xs-space-around": {
    alignContent: "space-around"
  },

  /* Styles applied to the root element if `justify="center"`. */
  "justify-xs-center": {
    justifyContent: "center"
  },

  /* Styles applied to the root element if `justify="flex-end"`. */
  "justify-xs-flex-end": {
    justifyContent: "flex-end"
  },

  /* Styles applied to the root element if `justify="space-between"`. */
  "justify-xs-space-between": {
    justifyContent: "space-between"
  },

  /* Styles applied to the root element if `justify="space-around"`. */
  "justify-xs-space-around": {
    justifyContent: "space-around"
  },

  /* Styles applied to the root element if `justify="space-evenly"`. */
  "justify-xs-space-evenly": {
    justifyContent: "space-evenly"
  },
  ...generateGutter(theme, "xs"),
  ...breakpointKeys.reduce((accumulator, key) => {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {})
});

function Grid(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    alignContent,
    alignItems,
    classes,
    className: classNameProp,
    component: Component,
    container,
    direction,
    item,
    justify,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth,
    ...other
  } = props;
  const className = classNames(
    container && classes.container,
    item && classes.item,
    zeroMinWidth && classes.zeroMinWidth,
    container && spacing !== 0 && classes[`spacing-xs-${String(spacing)}`],
    direction !== Grid.defaultProps.direction &&
      classes[`direction-xs-${String(direction)}`],
    wrap !== Grid.defaultProps.wrap && classes[`wrap-xs-${String(wrap)}`],
    alignItems !== Grid.defaultProps.alignItems &&
      classes[`align-items-xs-${String(alignItems)}`],
    alignContent !== Grid.defaultProps.alignContent &&
      classes[`align-content-xs-${String(alignContent)}`],
    justify !== Grid.defaultProps.justify &&
      classes[`justify-xs-${String(justify)}`],
    xs !== false && classes[`grid-xs-${String(xs)}`],
    sm !== false && classes[`grid-sm-${String(sm)}`],
    md !== false && classes[`grid-md-${String(md)}`],
    lg !== false && classes[`grid-lg-${String(lg)}`],
    xl !== false && classes[`grid-xl-${String(xl)}`],
    classNameProp
  );
  return (
    <Component className={classNamesAny(Component, className)} {...other} />
  );
}

const StyledGrid = withStyles(styles, {
  name: "MuiGrid"
})(Grid);

if (process.env.NODE_ENV !== "production") {
  const requireProp = requirePropFactory("Grid");
  StyledGrid.propTypes = {
    ...StyledGrid.propTypes,
    alignContent: requireProp("container"),
    alignItems: requireProp("container"),
    direction: requireProp("container"),
    justify: requireProp("container"),
    lg: requireProp("item"),
    md: requireProp("item"),
    sm: requireProp("item"),
    spacing: requireProp("container"),
    wrap: requireProp("container"),
    xs: requireProp("item"),
    zeroMinWidth: requireProp("zeroMinWidth")
  };
}

const defaultProps = (Grid.defaultProps = {
  alignContent: "stretch",
  alignItems: "stretch",
  component: "div",
  container: false,
  direction: "row",
  item: false,
  justify: "flex-start",
  lg: false,
  md: false,
  sm: false,
  spacing: 0,
  wrap: "wrap",
  xl: false,
  xs: false,
  zeroMinWidth: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Grid/Grid').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Grid/Grid').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Grid/Grid').Shape> } TDefaultProps */

/** @type { TComponent } */
const GridCode = Grid;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  GridCode as Grid,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
