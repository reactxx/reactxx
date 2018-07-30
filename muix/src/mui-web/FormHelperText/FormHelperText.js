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
    '&.error35': {
      color: theme.palette.error.main
    },
    '&.disabled35': {
      color: theme.palette.text.disabled
    }
  },
  error: {
    NAME$error35: true
  },
  disabled: {
    NAME$disabled35: true
  },
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
  return <Component className={classNamesStr(className)} {...other} />;
}

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = {
  component: 'p'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/FormHelperText/FormHelperText').Shape>}
*/
export const FormHelperTextCreator = withStyles(styles, FormHelperText, {
  isMui: true,
  defaultProps
});
const FormHelperTextComponent = FormHelperTextCreator();
export default FormHelperTextComponent;