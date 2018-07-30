import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
export const styles = theme => ({
  root: {
    height: 1,
    margin: 0,
    // Reset browser default style.
    border: 'none',
    flexShrink: 0,
    backgroundColor: theme.palette.divider
  },
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  inset: {
    marginLeft: 72
  },
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08)
  }
});

function Divider(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    absolute,
    classes,
    className: classNameProp,
    component: Component,
    inset,
    light,
    ...other
  } = props;
  const className = classNames(classes.root, absolute && classes.absolute, inset && classes.inset, light && classes.light, classNameProp);
  return <Component className={classNamesStr(className)} {...other} />;
}

const defaultProps = {
  absolute: false,
  component: 'hr',
  inset: false,
  light: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Divider/Divider').Shape>}
*/
export const DividerCreator = withStyles(styles, Divider, {
  isMui: true,
  defaultProps
});
const DividerComponent = DividerCreator();
export default DividerComponent;