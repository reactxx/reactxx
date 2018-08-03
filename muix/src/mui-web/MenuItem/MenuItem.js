// @inheritedComponent ListItem
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from "../ListItem/ListItem";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: { ...theme.typography.subheading,
    height: 24,
    boxSizing: 'content-box',
    width: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingLeft: 16,
    paddingRight: 16,
    '&.selected58': {
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
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    classes,
    className,
    component,
    selected,
    role,
    ...other
  } = props;
  return <ListItem button role={role} tabIndex={-1} className={classNames(classes.root, selected && classes.selected, className)} component={component} {...other} />;
}

const defaultProps = MenuItem.defaultProps = {
  component: 'li',
  role: 'menuitem',
  selected: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/MenuItem/MenuItem').Shape>}
*/
export const MenuItemCreator = withStyles(styles, MenuItem, {
  isMui: true,
  defaultProps
});
const MenuItemComponent = MenuItemCreator();
if (MenuItem.muiName) MenuItemComponent.muiName = MenuItem.muiName;
export default MenuItemComponent;