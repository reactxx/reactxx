import React from 'react';
import PropTypes from 'prop-types';
import Typography from '../Typography';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    display: 'flex',
    maxHeight: '2em',
    alignItems: 'center'
  },
  positionStart: {
    marginRight: 8
  },
  positionEnd: {
    marginLeft: 8
  }
};

function InputAdornment(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position,
    ...other
  } = props;
  return <Component className={classNames(classes.root, position === 'start' && classes.positionStart, position === 'end' && classes.positionEnd, className)} {...other}>
      {typeof children === 'string' && !disableTypography ? <Typography color="textSecondary">{children}</Typography> : children}
    </Component>;
}

export default withStyles(styles, {
  name: 'MuiInputAdornment',
  defaultProps: {
    component: 'div',
    disableTypography: false
  }
})(InputAdornment);