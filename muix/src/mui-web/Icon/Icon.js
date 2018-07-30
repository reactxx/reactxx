import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  root: {
    userSelect: 'none',
    fontSize: 24,
    width: '1em',
    height: '1em',
    // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
    // To remove at some point.
    overflow: 'hidden',
    flexShrink: 0
  },
  colorPrimary: {
    color: theme.palette.primary.main
  },
  colorSecondary: {
    color: theme.palette.secondary.main
  },
  colorAction: {
    color: theme.palette.action.active
  },
  colorError: {
    color: theme.palette.error.main
  },
  colorDisabled: {
    color: theme.palette.action.disabled
  },
  fontSizeInherit: {
    fontSize: 'inherit'
  }
});

function Icon(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className,
    color,
    fontSize,
    ...other
  } = props;
  return <span className={classNamesStr('material-icons', classes.root, color !== 'inherit' && classes[`color${capitalize(color)}`], fontSize !== 'default' && classes[`fontSize${capitalize(fontSize)}`], className)} aria-hidden="true" {...other}>
      {children}
    </span>;
}

Icon.muiName = 'Icon';
const defaultProps = {
  color: 'inherit',
  fontSize: 'default'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Icon/Icon').Shape>}
*/
export const IconCreator = withStyles(styles, Icon, {
  isMui: true,
  defaultProps
});
const IconComponent = IconCreator();
export default IconComponent;