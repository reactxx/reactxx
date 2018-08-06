//autogenerated--------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.3 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("margin", 0),
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    textAlign: "left",
    marginTop: 8,
    lineHeight: "1em",
    minHeight: "1em",
    "&.error35": {
      color: theme.palette.error.main
    },
    "&.disabled35": {
      color: theme.palette.text.disabled
    }
  },

  /* Styles applied to the root element if `error={true}`. */
  error: {
    NAME$error35: true
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled35: true
  },

  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 4
  },

  /* Styles applied to the root element if `focused={true}`. */
  focused: {},

  /* Styles applied to the root element if `filled={true}`. */
  filled: {},

  /* Styles applied to the root element if `required={true}`. */
  required: {}
});

function FormHelperText(props, context) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className: classNameProp,
    component: Component,
    disabled: disabledProp,
    error: errorProp,
    filled: filledProp,
    focused: focusedProp,
    margin: marginProp,
    required: requiredProp,
    ...other
  } = props;
  const { muiFormControl } = context;
  let disabled = disabledProp;
  let error = errorProp;
  let filled = filledProp;
  let focused = focusedProp;
  let margin = marginProp;
  let required = requiredProp;

  if (muiFormControl) {
    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === "undefined") {
      error = muiFormControl.error;
    }

    if (typeof margin === "undefined") {
      margin = muiFormControl.margin;
    }

    if (typeof required === "undefined") {
      required = muiFormControl.required;
    }

    if (typeof focused === "undefined") {
      focused = muiFormControl.focused;
    }

    if (typeof filled === "undefined") {
      filled = muiFormControl.filled;
    }
  }

  const className = classNames(
    classes.root,
    disabled && classes.disabled,
    error && classes.error,
    filled && classes.filled,
    focused && classes.focused,
    margin === "dense" && classes.marginDense,
    required && classes.required,
    classNameProp
  );
  return (
    <Component className={classNamesAny(Component, className)} {...other} />
  );
}

FormHelperText.contextTypes = {
  muiFormControl: PropTypes.object
};
export const defaultProps = (FormHelperText.defaultProps = {
  component: "p"
});

export const FormHelperTextCode = FormHelperText;
export const FormHelperTextCreator = withStyles(styles, FormHelperText, {
  isMui: true,
  defaultProps
});
export const FormHelperTextComponent = FormHelperTextCreator();
if (FormHelperText.muiName)
  FormHelperTextComponent.muiName = FormHelperText.muiName;
export default FormHelperTextComponent;
