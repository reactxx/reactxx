//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import Fade from "../Fade/Fade";
const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: "fixed",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // Remove grey highlight
    WebkitTapHighlightColor: "transparent"
  },

  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: "transparent"
  }
};

function Backdrop(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    invisible,
    open,
    transitionDuration,
    ...other
  } = props;
  return (
    <Fade appear in={open} timeout={transitionDuration} {...other}>
      <div
        data-mui-test="Backdrop"
        className={classNamesStr(
          classes.root,
          invisible && classes.invisible,
          className
        )}
        aria-hidden="true"
      />
    </Fade>
  );
}

const defaultProps = (Backdrop.defaultProps = {
  invisible: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Backdrop/Backdrop').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Backdrop/Backdrop').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Backdrop/Backdrop').Shape> } TDefaultProps */

/** @type { TComponent } */
const BackdropCode = Backdrop;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  BackdropCode as Backdrop,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
