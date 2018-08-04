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
const RADIUS = 11;

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: "relative",
    display: "inline-flex",
    // For correct alignment with the text.
    verticalAlign: "middle"
  },

  /* Styles applied to the badge `span` element. */
  badge: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -RADIUS,
    right: -RADIUS,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight,
    fontSize: theme.typography.pxToRem(12),
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: "50%",
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
    zIndex: 1 // Render the badge on top of potential ripples.
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
  },

  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  }
});

function Badge(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    badgeContent,
    children,
    classes,
    className: classNameProp,
    color,
    component: ComponentProp,
    ...other
  } = props;
  const badgeClassName = classNames(
    classes.badge,
    color !== "default" && classes[`color${capitalize(color)}`]
  );
  return (
    <ComponentProp
      className={classNamesAny(ComponentProp, classes.root, classNameProp)}
      {...other}
    >
      {children}
      <span className={classNamesStr(badgeClassName)}>{badgeContent}</span>
    </ComponentProp>
  );
}

const defaultProps = (Badge.defaultProps = {
  color: "default",
  component: "span"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Badge/Badge').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Badge/Badge').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Badge/Badge').Shape> } TDefaultProps */

/** @type { TComponent } */
const BadgeCode = Badge;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  BadgeCode as Badge,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};