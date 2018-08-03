import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: { ...toAtomic('padding', 0),
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: 1,
    '&.focused35': {
      color: theme.palette.primary[theme.palette.type === 'light' ? 'dark' : 'light']
    },
    '&.disabled35': {
      color: theme.palette.text.disabled
    },
    '&.error35': {
      color: theme.palette.error.main
    }
  },

  /* Styles applied to the root element if `focused={true}`. */
  focused: {
    NAME$focused35: true
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled35: true
  },

  /* Styles applied to the root element if `error={true}`. */
  error: {
    NAME$error35: true
  },
  asterisk: {
    '&.error35': {
      color: theme.palette.error.main
    }
  }
});

function FormLabel(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
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
  return <Component className={classNamesAny(Component, className)} {...other}>
      {children}
      {required && <span className={classNamesStr(classes.asterisk, error && classes.error)} data-mui-test="FormLabelAsterisk">
          {'\u2009*'}
        </span>}
    </Component>;
}

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = FormLabel.defaultProps = {
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
if (FormLabel.muiName) FormLabelComponent.muiName = FormLabel.muiName;
export default FormLabelComponent;