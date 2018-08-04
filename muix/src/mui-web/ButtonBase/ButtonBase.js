//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classNames from "classnames";
import keycode from "keycode";
import ownerWindow from "../utils/ownerWindow";
import withStyles from "../styles/withStyles";
import { listenForFocusKeys, detectFocusVisible } from "./focusVisible";
import TouchRipple from "./TouchRipple";
import createRippleHandler from "./createRippleHandler";
const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", 0),
    ...toAtomic("margin", 0),
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // Remove grey highlight
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: "none",
    border: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    // Remove the padding in Firefox
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    "-moz-appearance": "none",
    // Reset
    "-webkit-appearance": "none",
    // Reset
    textDecoration: "none",
    // So we take precedent over the style of a native <a /> element.
    color: "inherit",
    "&::-moz-focus-inner": {
      borderStyle: "none" // Remove Firefox dotted outline.
    },
    "&.disabled8": {
      pointerEvents: "none",
      // Disable link interactions
      cursor: "default"
    }
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled8: true
  },

  /* Styles applied to the root element if keyboard focused. */
  focusVisible: {}
};

/* istanbul ignore if */
if (process.env.NODE_ENV !== "production" && !React.createContext) {
  throw new Error("Material-UI: react@16.3.0 or greater is required.");
}
/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */

class ButtonBase extends React.Component {
  ripple = null;
  keyDown = false; // Used to help track keyboard activation keyDown

  button = null;
  focusVisibleTimeout = null;
  focusVisibleCheckTime = 50;
  focusVisibleMaxCheckTimes = 5;
  handleMouseDown = createRippleHandler(this, "MouseDown", "start", () => {
    clearTimeout(this.focusVisibleTimeout);

    if (this.state.focusVisible) {
      this.setState({
        focusVisible: false
      });
    }
  });
  handleMouseUp = createRippleHandler(this, "MouseUp", "stop");
  handleMouseLeave = createRippleHandler(this, "MouseLeave", "stop", event => {
    if (this.state.focusVisible) {
      event.preventDefault();
    }
  });
  handleTouchStart = createRippleHandler(this, "TouchStart", "start");
  handleTouchEnd = createRippleHandler(this, "TouchEnd", "stop");
  handleTouchMove = createRippleHandler(this, "TouchMove", "stop");
  handleBlur = createRippleHandler(this, "Blur", "stop", () => {
    clearTimeout(this.focusVisibleTimeout);

    if (this.state.focusVisible) {
      this.setState({
        focusVisible: false
      });
    }
  });
  state = {};

  componentDidMount() {
    this.button = ReactDOM.findDOMNode(this);
    listenForFocusKeys(ownerWindow(this.button));

    if (this.props.action) {
      this.props.action({
        focusVisible: () => {
          this.setState({
            focusVisible: true
          });
          this.button.focus();
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.focusRipple &&
      !this.props.disableRipple &&
      !prevState.focusVisible &&
      this.state.focusVisible
    ) {
      this.ripple.pulsate();
    }
  }

  componentWillUnmount() {
    this.button = null;
    clearTimeout(this.focusVisibleTimeout);
  }

  onRippleRef = node => {
    this.ripple = node;
  };
  onFocusVisibleHandler = event => {
    this.keyDown = false;
    this.setState({
      focusVisible: true
    });

    if (this.props.onFocusVisible) {
      this.props.onFocusVisible(event);
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.focusVisible === "undefined") {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled
      };
    } // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.

    if (!prevState.prevState && nextProps.disabled && prevState.focusVisible) {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled
      };
    }

    return {
      lastDisabled: nextProps.disabled
    };
  }

  handleKeyDown = event => {
    const { component, focusRipple, onKeyDown, onClick } = this.props;
    const key = keycode(event); // Check if key is already down to avoid repeats being counted as multiple activations

    if (
      focusRipple &&
      !this.keyDown &&
      this.state.focusVisible &&
      this.ripple &&
      key === "space"
    ) {
      this.keyDown = true;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.start(event);
      });
    }

    if (onKeyDown) {
      onKeyDown(event);
    } // Keyboard accessibility for non interactive elements

    if (
      event.target === event.currentTarget &&
      component &&
      component !== "button" &&
      (key === "space" || key === "enter") &&
      !(this.button.tagName === "A" && this.button.href)
    ) {
      event.preventDefault();

      if (onClick) {
        onClick(event);
      }
    }
  };
  handleKeyUp = event => {
    if (
      this.props.focusRipple &&
      keycode(event) === "space" &&
      this.ripple &&
      this.state.focusVisible
    ) {
      this.keyDown = false;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.pulsate(event);
      });
    }

    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };
  handleFocus = event => {
    if (this.props.disabled) {
      return;
    } // Fix for https://github.com/facebook/react/issues/7769

    if (!this.button) {
      this.button = event.currentTarget;
    }

    event.persist();
    detectFocusVisible(this, this.button, () => {
      this.onFocusVisibleHandler(event);
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      action,
      buttonRef,
      centerRipple,
      children,
      classes,
      className: classNameProp,
      component,
      disabled,
      disableRipple,
      disableTouchRipple,
      focusRipple,
      focusVisibleClassName,
      onBlur,
      onFocus,
      onFocusVisible,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      tabIndex,
      TouchRippleProps,
      type,
      ...other
    } = this.props;
    const className = classNames(
      classes.root,
      disabled && classes.disabled,
      this.state.focusVisible && classes.focusVisible,
      this.state.focusVisible && focusVisibleClassName,
      classNameProp
    );
    const buttonProps = {};
    let ComponentProp = component;

    if (ComponentProp === "button" && other.href) {
      ComponentProp = "a";
    }

    if (ComponentProp === "button") {
      buttonProps.type = type || "button";
      buttonProps.disabled = disabled;
    } else {
      buttonProps.role = "button";
    }

    return (
      <ComponentProp
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        tabIndex={disabled ? "-1" : tabIndex}
        className={classNamesAny(ComponentProp, className)}
        ref={buttonRef}
        {...buttonProps}
        {...other}
      >
        {children}
        {!disableRipple && !disabled ? (
          <TouchRipple
            innerRef={this.onRippleRef}
            center={centerRipple}
            {...TouchRippleProps}
          />
        ) : null}
      </ComponentProp>
    );
  }
}

const defaultProps = (ButtonBase.defaultProps = {
  centerRipple: false,
  component: "button",
  disableRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  tabIndex: "0",
  type: "button"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/ButtonBase/ButtonBase').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/ButtonBase/ButtonBase').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/ButtonBase/ButtonBase').Shape> } TDefaultProps */

/** @type { TComponent } */
const ButtonBaseCode = ButtonBase;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ButtonBaseCode as ButtonBase,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};