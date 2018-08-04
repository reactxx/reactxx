//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent ListItem
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import ListItem from "../ListItem/ListItem";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...theme.typography.subheading,
    height: 24,
    boxSizing: "content-box",
    width: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    paddingLeft: 16,
    paddingRight: 16,
    "&.selected58": {
      backgroundColor: theme.palette.action.selected
    }
  },

  /* Styles applied to the root element if `selected={true}`. */
  selected: {
    NAME$selected58: true
  }
});

function MenuItem(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    component,
    selected,
    role,
    ...other
  } = props;
  return (
    <ListItem
      button
      role={role}
      tabIndex={-1}
      className={classNames(
        classes.root,
        selected && classes.selected,
        className
      )}
      component={component}
      {...other}
    />
  );
}

const defaultProps = (MenuItem.defaultProps = {
  component: "li",
  role: "menuitem",
  selected: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/MenuItem/MenuItem').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/MenuItem/MenuItem').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/MenuItem/MenuItem').Shape> } TDefaultProps */

/** @type { TComponent } */
const MenuItemCode = MenuItem;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  MenuItemCode as MenuItem,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
