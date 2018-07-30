import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: 1,
    padding: 0,
    '&.focused36': {
      color: theme.palette.primary[theme.palette.type === 'light' ? 'dark' : 'light']
    },
    '&.disabled36': {
      color: theme.palette.text.disabled
    },
    '&.error36': {
      color: theme.palette.error.main
    }
  },
  focused: {
    NAME$focused36: true
  },
  disabled: {
    NAME$disabled36: true
  },
  error: {
    NAME$error36: true
  },
  asterisk: {
    '&.error36': {
      color: theme.palette.error.main
    }
  }
});

function FormLabel(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className: classNameProp,
    component: Component,
    disabled: disabledProp,
    error: errorProp,
    focused: focusedProp,
    required: requiredProp,
    ...other
  } = props;
  const {
    muiFormControl
  } = context;
  let required = requiredProp;
  let focused = focusedProp;
  let disabled = disabledProp;
  let error = errorProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }

    if (typeof focused === 'undefined') {
      focused = muiFormControl.focused;
    }

    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = muiFormControl.error;
    }
  }

  const className = classNames(classes.root, focused && classes.focused, disabled && classes.disabled, error && classes.error, classNameProp);
  return <Component className={classNamesStr(className)} {...other}>
      {children}
      {required && <span className={classNamesStr(classes.asterisk, error && classes.error)} data-mui-test="FormLabelAsterisk">
          {'\u2009*'}
        </span>}
    </Component>;
}

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = {
  component: 'label'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/FormLabel/FormLabel').Shape>}
*/
export const FormLabelCreator = withStyles(styles, FormLabel, {
  isMui: true,
  defaultProps
});
const FormLabelComponent = FormLabelCreator();
export default FormLabelComponent;