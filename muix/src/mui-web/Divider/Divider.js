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
import { fade } from "../styles/colorManipulator";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("margin", 0),
    height: 1,
    // Reset browser default style.
    border: "none",
    flexShrink: 0,
    backgroundColor: theme.palette.divider
  },

  /* Styles applied to the root element if `absolute={true}`. */
  absolute: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
  },

  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    marginLeft: 72
  },

  /* Styles applied to the root element if `light={true}`. */
  light: {
    backgroundColor: fade(theme.palette.divider, 0.08)
  }
});

function Divider(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    absolute,
    classes,
    className: classNameProp,
    component: Component,
    inset,
    light,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    absolute && classes.absolute,
    inset && classes.inset,
    light && classes.light,
    classNameProp
  );
  return (
    <Component className={classNamesAny(Component, className)} {...other} />
  );
}

const defaultProps = (Divider.defaultProps = {
  absolute: false,
  component: "hr",
  inset: false,
  light: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Divider/Divider').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Divider/Divider').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Divider/Divider').Shape> } TDefaultProps */

/** @type { TComponent } */
const DividerCode = Divider;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  DividerCode as Divider,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};