//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent Paper
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import { capitalize } from "../utils/helpers";
import Paper from "../Paper/Paper";

const styles = theme => {
  const backgroundColorDefault =
    theme.palette.type === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900];
  return {
    /* Styles applied to the root element. */
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      // Prevent padding issue with the Modal and fixed positioned AppBar.
      zIndex: theme.zIndex.appBar,
      flexShrink: 0
    },

    /* Styles applied to the root element if `position="fixed"`. */
    positionFixed: {
      position: "fixed",
      top: 0,
      left: "auto",
      right: 0
    },

    /* Styles applied to the root element if `position="absolute"`. */
    positionAbsolute: {
      position: "absolute",
      top: 0,
      left: "auto",
      right: 0
    },

    /* Styles applied to the root element if `position="sticky"`. */
    positionSticky: {
      position: "sticky",
      top: 0,
      left: "auto",
      right: 0
    },

    /* Styles applied to the root element if `position="static"`. */
    positionStatic: {
      position: "static"
    },

    /* Styles applied to the root element if `color="default"`. */
    colorDefault: {
      backgroundColor: backgroundColorDefault,
      color: theme.palette.getContrastText(backgroundColorDefault)
    },

    /* Styles applied to the root element if `color="primary"`. */
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },

    /* Styles applied to the root element if `color="secondary"`. */
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    }
  };
};

function AppBar(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className: classNameProp,
    color,
    position,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    classes[`position${capitalize(position)}`],
    color !== "inherit" && classes[`color${capitalize(color)}`],
    position === "fixed" && "mui-fixed",
    classNameProp
  );
  return (
    <Paper
      square
      component="header"
      elevation={4}
      className={className}
      {...other}
    >
      {children}
    </Paper>
  );
}

const defaultProps = (AppBar.defaultProps = {
  color: "primary",
  position: "fixed"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/AppBar/AppBar').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/AppBar/AppBar').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/AppBar/AppBar').Shape> } TDefaultProps */

/** @type { TComponent } */
const AppBarCode = AppBar;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  AppBarCode as AppBar,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
