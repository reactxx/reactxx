//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import { cloneChildrenWithClassName } from "../utils/reactHelpers";
import "../Button/Button"; // So we don't have any override priority issue.

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", "8px 4px"),
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    [theme.breakpoints.up("sm")]: {
      ...toAtomic("padding", "8px 12px")
    }
  },

  /* Styles applied to the children. */
  action: {
    ...toAtomic("margin", "0 4px")
  }
});

function CardActions(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    disableActionSpacing,
    children,
    classes,
    className,
    ...other
  } = props;
  return (
    <div className={classNamesStr(classes.root, className)} {...other}>
      {disableActionSpacing
        ? children
        : cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
}

const defaultProps = (CardActions.defaultProps = {
  disableActionSpacing: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/CardActions/CardActions').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/CardActions/CardActions').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/CardActions/CardActions').Shape> } TDefaultProps */

/** @type { TComponent } */
const CardActionsCode = CardActions;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CardActionsCode as CardActions,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
