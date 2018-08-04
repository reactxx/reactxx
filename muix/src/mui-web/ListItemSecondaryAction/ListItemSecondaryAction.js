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
export const styles = {
  /* Styles applied to the root element. */
  root: {
    position: "absolute",
    right: 4,
    top: "50%",
    transform: "translateY(-50%)"
  }
};

function ListItemSecondaryAction(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    ...other
  } = props;
  return (
    <div className={classNamesStr(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

ListItemSecondaryAction.muiName = "ListItemSecondaryAction";
const defaultProps = (ListItemSecondaryAction.defaultProps = {});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ListItemSecondaryAction/ListItemSecondaryAction').Shape>}
 */
export const ListItemSecondaryActionCreator = withStyles(
  styles,
  ListItemSecondaryAction,
  {
    isMui: true,
    defaultProps
  }
);
const ListItemSecondaryActionComponent = ListItemSecondaryActionCreator();
if (ListItemSecondaryAction.muiName)
  ListItemSecondaryActionComponent.muiName = ListItemSecondaryAction.muiName;
export default ListItemSecondaryActionComponent;
