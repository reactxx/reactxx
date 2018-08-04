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
const styles = {
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

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/ListItemSecondaryAction/ListItemSecondaryAction').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/ListItemSecondaryAction/ListItemSecondaryAction').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/ListItemSecondaryAction/ListItemSecondaryAction').Shape> } TDefaultProps */

/** @type { TComponent } */
const ListItemSecondaryActionCode = ListItemSecondaryAction;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ListItemSecondaryActionCode as ListItemSecondaryAction,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
