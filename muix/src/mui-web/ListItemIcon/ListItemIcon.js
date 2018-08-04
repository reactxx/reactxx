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
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    marginRight: 16,
    color: theme.palette.action.active,
    flexShrink: 0
  }
});
/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */

function ListItemIcon(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className: classNameProp,
    ...other
  } = props;
  return React.cloneElement(children, {
    className: classNames(
      classes.root,
      classNameProp,
      children.props.className
    ),
    ...other
  });
}

const defaultProps = (ListItemIcon.defaultProps = {});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ListItemIcon/ListItemIcon').Shape>}
 */
export const ListItemIconCreator = withStyles(styles, ListItemIcon, {
  isMui: true,
  defaultProps
});
const ListItemIconComponent = ListItemIconCreator();
if (ListItemIcon.muiName) ListItemIconComponent.muiName = ListItemIcon.muiName;
export default ListItemIconComponent;
