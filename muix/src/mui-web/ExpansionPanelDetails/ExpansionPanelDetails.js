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
const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", "8px 24px 24px"),
    display: "flex"
  }
};

function ExpansionPanelDetails(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    children,
    className,
    ...other
  } = props;
  return (
    <div className={classNamesStr(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

const defaultProps = (ExpansionPanelDetails.defaultProps = {});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/ExpansionPanelDetails/ExpansionPanelDetails').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/ExpansionPanelDetails/ExpansionPanelDetails').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/ExpansionPanelDetails/ExpansionPanelDetails').Shape> } TDefaultProps */

/** @type { TComponent } */
const ExpansionPanelDetailsCode = ExpansionPanelDetails;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ExpansionPanelDetailsCode as ExpansionPanelDetails,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
