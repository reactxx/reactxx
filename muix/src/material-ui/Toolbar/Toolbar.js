import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  gutters: theme.mixins.gutters(),
  regular: theme.mixins.toolbar,
  dense: {
    minHeight: 48
  }
});

function Toolbar(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className: classNameProp,
    disableGutters,
    variant,
    ...other
  } = props;
  const className = classNames(classes.root, classes[variant], !disableGutters && classes.gutters, classNameProp);
  return <div className={classNamesStr(className)} {...other}>
      {children}
    </div>;
}

export default withStyles(styles, {
  name: 'MuiToolbar',
  defaultProps: {
    disableGutters: false,
    variant: 'regular'
  }
})(Toolbar);