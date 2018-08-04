//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", 0),
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: 1,
    "&.focused36": {
      color:
        theme.palette.primary[theme.palette.type === "light" ? "dark" : "light"]
    },
    "&.disabled36": {
      color: theme.palette.text.disabled
    },
    "&.error36": {
      color: theme.palette.error.main
    }
  },

  /* Styles applied to the root element if `focused={true}`. */
  focused: {
    NAME$focused36: true
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled36: true
  },

  /* Styles applied to the root element if `error={true}`. */
  error: {
    NAME$error36: true
  },
  asterisk: {
    "&.error36": {
      color: theme.palette.error.main
    }
  }
});

function FormLabel(props, context) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
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
  const { muiFormControl } = context;
  let required = requiredProp;
  let focused = focusedProp;
  let disabled = disabledProp;
  let error = errorProp;

  if (muiFormControl) {
    if (typeof required === "undefined") {
      required = muiFormControl.required;
    }

    if (typeof focused === "undefined") {
      focused = muiFormControl.focused;
    }

    if (typeof disabled === "undefined") {
      disabled = muiFormControl.disabled;
    }

    if (typeof error === "undefined") {
      error = muiFormControl.error;
    }
  }

  const className = classNames(
    classes.root,
    focused && classes.focused,
    disabled && classes.disabled,
    error && classes.error,
    classNameProp
  );
  return (
    <Component className={classNamesAny(Component, className)} {...other}>
      {children}
      {required && (
        <span
          className={classNamesStr(classes.asterisk, error && classes.error)}
          data-mui-test="FormLabelAsterisk"
        >
          {"\u2009*"}
        </span>
      )}
    </Component>
  );
}

FormLabel.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = (FormLabel.defaultProps = {
  component: "label"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/FormLabel/FormLabel').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/FormLabel/FormLabel').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/FormLabel/FormLabel').Shape> } TDefaultProps */

/** @type { TComponent } */
const FormLabelCode = FormLabel;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  FormLabelCode as FormLabel,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
