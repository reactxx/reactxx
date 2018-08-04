//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent IconButton
import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import IconButton from "../IconButton/IconButton";
const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    transition: "none",
    "&:hover": {
      // Disable the hover effect for the IconButton.
      backgroundColor: "transparent"
    }
  },
  checked: {},
  disabled: {},
  input: {
    ...toAtomic("padding", 0),
    ...toAtomic("margin", 0),
    cursor: "inherit",
    position: "absolute",
    opacity: 0,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  }
};

/**
 * @ignore - internal component.
 */
class SwitchBase extends React.Component {
  input = null;
  isControlled = null;

  constructor(props) {
    super(props);
    this.isControlled = props.checked != null;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.checked =
        props.defaultChecked !== undefined ? props.defaultChecked : false;
    }
  }

  state = {};
  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    const { muiFormControl } = this.context;

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    const { muiFormControl } = this.context;

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  handleInputChange = event => {
    const checked = event.target.checked;

    if (!this.isControlled) {
      this.setState({
        checked
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event, checked);
    }
  };

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      autoFocus,
      checked: checkedProp,
      checkedIcon,
      classes,
      className: classNameProp,
      disabled: disabledProp,
      icon,
      id,
      inputProps,
      inputRef,
      name,
      onBlur,
      onChange,
      onFocus,
      readOnly,
      required,
      tabIndex,
      type,
      value,
      ...other
    } = this.props;
    const { muiFormControl } = this.context;
    let disabled = disabledProp;

    if (muiFormControl) {
      if (typeof disabled === "undefined") {
        disabled = muiFormControl.disabled;
      }
    }

    const checked = this.isControlled ? checkedProp : this.state.checked;
    const hasLabelFor = type === "checkbox" || type === "radio";
    return (
      <IconButton
        component="span"
        className={classNames(
          classes.root,
          checked && classes.checked,
          disabled && classes.disabled,
          classNameProp
        )}
        disabled={disabled}
        tabIndex={null}
        role={undefined}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...other}
      >
        {checked ? checkedIcon : icon}
        <input
          autoFocus={autoFocus}
          checked={checked}
          className={classNamesStr(classes.input)}
          disabled={disabled}
          id={hasLabelFor && id}
          name={name}
          onChange={this.handleInputChange}
          readOnly={readOnly}
          ref={inputRef}
          required={required}
          tabIndex={tabIndex}
          type={type}
          value={value}
          {...inputProps}
        />
      </IconButton>
    );
  }
} // NB: If changed, please update Checkbox, Switch and Radio
// so that the API documentation is updated.

SwitchBase.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = (SwitchBase.defaultProps = {
  type: "checkbox"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/SwitchBase/SwitchBase').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/SwitchBase/SwitchBase').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/SwitchBase/SwitchBase').Shape> } TDefaultProps */

/** @type { TComponent } */
const SwitchBaseCode = SwitchBase;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  SwitchBaseCode as SwitchBase,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
