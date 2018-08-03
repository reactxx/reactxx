import React from 'react';
import PropTypes from 'prop-types';
import Typography from "../Typography/Typography";
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    maxHeight: '2em',
    alignItems: 'center'
  },

  /* Styles applied to the root element if `position="start"`. */
  positionStart: {
    marginRight: 8
  },

  /* Styles applied to the root element if `position="end"`. */
  positionEnd: {
    marginLeft: 8
  }
};

function InputAdornment(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position,
    ...other
  } = props;
  return <Component className={classNamesAny(Component, classes.root, position === 'start' && classes.positionStart, position === 'end' && classes.positionEnd, className)} {...other}>
      {typeof children === 'string' && !disableTypography ? <Typography color="textSecondary">{children}</Typography> : children}
    </Component>;
}

const defaultProps = InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/InputAdornment/InputAdornment').Shape>}
*/
export const InputAdornmentCreator = withStyles(styles, InputAdornment, {
  isMui: true,
  defaultProps
});
const InputAdornmentComponent = InputAdornmentCreator();
if (InputAdornment.muiName) InputAdornmentComponent.muiName = InputAdornment.muiName;
export default InputAdornmentComponent;