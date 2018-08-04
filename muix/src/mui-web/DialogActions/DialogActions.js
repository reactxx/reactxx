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

const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("margin", "8px 4px"),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: "0 0 auto"
  },

  /* Styles applied to the children. */
  action: {
    ...toAtomic("margin", "0 4px")
  }
};

function DialogActions(props) {
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

const defaultProps = (DialogActions.defaultProps = {
  disableActionSpacing: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/DialogActions/DialogActions').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/DialogActions/DialogActions').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/DialogActions/DialogActions').Shape> } TDefaultProps */

/** @type { TComponent } */
const DialogActionsCode = DialogActions;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  DialogActionsCode as DialogActions,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
