import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  root: theme.mixins.gutters({
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14)
  }),
  colorPrimary: {
    color: theme.palette.primary.main
  },
  colorInherit: {
    color: 'inherit'
  },
  inset: {
    paddingLeft: 72
  },
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'inherit'
  }
});

function ListSubheader(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className,
    color,
    component: Component,
    disableSticky,
    inset,
    ...other
  } = props;
  return <Component className={classNames(classes.root, color !== 'default' && classes[`color${capitalize(color)}`], inset && classes.inset, !disableSticky && classes.sticky, className)} {...other} />;
}

ListSubheader.muiName = 'ListSubheader';
export default withStyles(styles, {
  name: 'MuiListSubheader',
  defaultProps: {
    color: 'default',
    component: 'li',
    disableSticky: false,
    inset: false
  }
})(ListSubheader);