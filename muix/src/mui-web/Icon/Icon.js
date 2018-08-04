//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import { capitalize } from "../utils/helpers";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    userSelect: "none",
    fontSize: 24,
    width: "1em",
    height: "1em",
    // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
    // To remove at some point.
    overflow: "hidden",
    flexShrink: 0
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main
  },

  /* Styles applied to the root element if `color="action"`. */
  colorAction: {
    color: theme.palette.action.active
  },

  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main
  },

  /* Styles applied to the root element if `color="disabled"`. */
  colorDisabled: {
    color: theme.palette.action.disabled
  },
  fontSizeInherit: {
    fontSize: "inherit"
  }
});

function Icon(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    color,
    fontSize,
    ...other
  } = props;
  return (
    <span
      className={classNamesStr(
        "material-icons",
        classes.root,
        color !== "inherit" && classes[`color${capitalize(color)}`],
        fontSize !== "default" && classes[`fontSize${capitalize(fontSize)}`],
        className
      )}
      aria-hidden="true"
      {...other}
    >
      {children}
    </span>
  );
}

Icon.muiName = "Icon";
const defaultProps = (Icon.defaultProps = {
  color: "inherit",
  fontSize: "default"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Icon/Icon').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Icon/Icon').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Icon/Icon').Shape> } TDefaultProps */

/** @type { TComponent } */
const IconCode = Icon;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  IconCode as Icon,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};