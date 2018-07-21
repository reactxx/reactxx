import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'left',
    marginTop: 8,
    lineHeight: '1em',
    minHeight: '1em',
    margin: 0,
    '&$error': {
      color: theme.palette.error.main
    },
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  },
  error: {},
  disabled: {},
  marginDense: {
    marginTop: 4
  }
});

function FormHelperText(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className: classNameProp,
    disabled: disabledProp,
    error: errorProp,
    margin: marginProp,
    component: Component,
    ...other
  } = props;
  const {
    muiFormControl
  } = context;
  let disabled = disabledProp;
  let error = errorProp;
  let margin = marginProp;

  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = muiFormControl.margin;
    }
  }

  const className = classNames(classes.root, disabled && classes.disabled, error && classes.error, margin === 'dense' && classes.marginDense, classNameProp);
  return <Component className={className} {...other} />;
}

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = {
  component: 'p'
};
const meta = {
  component: FormHelperText || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;