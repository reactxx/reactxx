// @inheritedComponent ListItem
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import ListItem from '../ListItem';
export const styles = theme => ({
  root: { ...theme.typography.subheading,
    height: 24,
    boxSizing: 'content-box',
    width: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingLeft: 16,
    paddingRight: 16,
    '&$selected': {
      backgroundColor: theme.palette.action.selected
    }
  },
  selected: {}
});

function MenuItem(props) {
  const {
    $system: {
      classNames,
      classNamesStr
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

const defaultProps = {
  component: 'li',
  role: 'menuitem',
  selected: false
};
const meta = {
  component: MenuItem || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;