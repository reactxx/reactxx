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
export const styles = {
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

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ExpansionPanelDetails/ExpansionPanelDetails').Shape>}
 */
export const ExpansionPanelDetailsCreator = withStyles(
  styles,
  ExpansionPanelDetails,
  {
    isMui: true,
    defaultProps
  }
);
const ExpansionPanelDetailsComponent = ExpansionPanelDetailsCreator();
if (ExpansionPanelDetails.muiName)
  ExpansionPanelDetailsComponent.muiName = ExpansionPanelDetails.muiName;
export default ExpansionPanelDetailsComponent;
