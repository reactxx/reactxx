import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
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
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className: classNameProp,
    ...other
  } = props;
  return React.cloneElement(children, {
    className: classNames(classes.root, classNameProp, children.props.className),
    ...other
  });
}

export default withStyles(styles, {
  name: 'MuiListItemIcon'
})(ListItemIcon);