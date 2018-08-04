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
    ...toAtomic("padding", "16px 8px"),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },

  /* Styles applied to the children. */
  action: {
    marginLeft: 8
  }
};

function ExpansionPanelActions(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    ...other
  } = props;
  return (
    <div className={classNamesStr(classes.root, className)} {...other}>
      {cloneChildrenWithClassName(children, classes.action)}
    </div>
  );
}

const defaultProps = (ExpansionPanelActions.defaultProps = {});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/ExpansionPanelActions/ExpansionPanelActions').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/ExpansionPanelActions/ExpansionPanelActions').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/ExpansionPanelActions/ExpansionPanelActions').Shape> } TDefaultProps */

/** @type { TComponent } */
const ExpansionPanelActionsCode = ExpansionPanelActions;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ExpansionPanelActionsCode as ExpansionPanelActions,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
