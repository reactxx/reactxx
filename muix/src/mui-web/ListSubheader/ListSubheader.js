import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: theme.mixins.gutters({
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14)
  }),

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit'
  },

  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    paddingLeft: 72
  },

  /* Styles applied to the root element if `disableSticky={false}`. */
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
      classNamesStr,
      theme
    },
    classes,
    className,
    color,
    component: Component,
    disableSticky,
    inset,
    ...other
  } = props;
  return <Component className={classNamesStr(classes.root, color !== 'default' && classes[`color${capitalize(color)}`], inset && classes.inset, !disableSticky && classes.sticky, className)} {...other} />;
}

ListSubheader.muiName = 'ListSubheader';
const defaultProps = ListSubheader.defaultProps = {
  color: 'default',
  component: 'li',
  disableSticky: false,
  inset: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ListSubheader/ListSubheader').Shape>}
*/
export const ListSubheaderCreator = withStyles(styles, ListSubheader, {
  isMui: true,
  defaultProps
});
const ListSubheaderComponent = ListSubheaderCreator();
ListSubheaderComponent.muiName = ListSubheader.muiName;
export default ListSubheaderComponent;