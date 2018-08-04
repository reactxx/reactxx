//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent ButtonBase
import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import ButtonBase from "../ButtonBase/ButtonBase";
import StepLabel from "../StepLabel";
import { isMuiElement } from "../utils/reactHelpers";
export const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", "24px 16px"),
    ...toAtomic("margin", "-24px -16px"),
    width: "100%",
    boxSizing: "content-box"
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    justifyContent: "flex-start"
  },

  /* Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: {
    color: "rgba(0, 0, 0, 0.3)"
  }
};

function StepButton(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    disabled,
    icon,
    last,
    optional,
    orientation,
    ...other
  } = props;
  const childProps = {
    active,
    alternativeLabel,
    completed,
    disabled,
    icon,
    optional,
    orientation
  };
  const child = isMuiElement(children, ["StepLabel"]) ? (
    React.cloneElement(children, childProps)
  ) : (
    <StepLabel {...childProps}>{children}</StepLabel>
  );
  return (
    <ButtonBase
      disabled={disabled}
      TouchRippleProps={{
        className: classes.touchRipple
      }}
      className={classNames(classes.root, classes[orientation], classNameProp)}
      {...other}
    >
      {child}
    </ButtonBase>
  );
}

const defaultProps = (StepButton.defaultProps = {});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/StepButton/StepButton').Shape>}
 */
export const StepButtonCreator = withStyles(styles, StepButton, {
  isMui: true,
  defaultProps
});
const StepButtonComponent = StepButtonCreator();
if (StepButton.muiName) StepButtonComponent.muiName = StepButton.muiName;
export default StepButtonComponent;
