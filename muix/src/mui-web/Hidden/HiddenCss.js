//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import warning from "warning";
import { keys as breakpointKeys } from "../styles/createBreakpoints";
import { capitalize } from "../utils/helpers";
import withStyles from "../styles/withStyles";

const styles = theme => {
  const hidden = {
    display: "none"
  };
  return breakpointKeys.reduce((acc, key) => {
    acc[`only${capitalize(key)}`] = {
      [theme.breakpoints.only(key)]: hidden
    };
    acc[`${key}Up`] = {
      [theme.breakpoints.up(key)]: hidden
    };
    acc[`${key}Down`] = {
      [theme.breakpoints.down(key)]: hidden
    };
    return acc;
  }, {});
};
/**
 * @ignore - internal component.
 */

function HiddenCss(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    lgDown,
    lgUp,
    mdDown,
    mdUp,
    only,
    smDown,
    smUp,
    xlDown,
    xlUp,
    xsDown,
    xsUp,
    ...other
  } = props;
  warning(
    Object.keys(other).length === 0 ||
      (Object.keys(other).length === 1 && other.hasOwnProperty("ref")),
    `Material-UI: unsupported properties received ${Object.keys(other).join(
      ", "
    )} by \`<Hidden />\`.`
  );
  const classNames = [];

  if (className) {
    classNames.push(className);
  }

  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const breakpoint = breakpointKeys[i];
    const breakpointUp = props[`${breakpoint}Up`];
    const breakpointDown = props[`${breakpoint}Down`];

    if (breakpointUp) {
      classNames.push(classes[`${breakpoint}Up`]);
    }

    if (breakpointDown) {
      classNames.push(classes[`${breakpoint}Down`]);
    }
  }

  if (only) {
    const onlyBreakpoints = Array.isArray(only) ? only : [only];
    onlyBreakpoints.forEach(breakpoint => {
      classNames.push(classes[`only${capitalize(breakpoint)}`]);
    });
  }

  return <div className={classNamesStr(classNames.join(" "))}>{children}</div>;
}

const defaultProps = (HiddenCss.defaultProps = {});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/HiddenCss/HiddenCss').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/HiddenCss/HiddenCss').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/HiddenCss/HiddenCss').Shape> } TDefaultProps */

/** @type { TComponent } */
const HiddenCssCode = HiddenCss;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  HiddenCssCode as HiddenCss,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
