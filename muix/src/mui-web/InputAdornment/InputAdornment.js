//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "../Typography/Typography";
import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {
    display: "flex",
    maxHeight: "2em",
    alignItems: "center"
  },

  /* Styles applied to the root element if `position="start"`. */
  positionStart: {
    marginRight: 8
  },

  /* Styles applied to the root element if `position="end"`. */
  positionEnd: {
    marginLeft: 8
  }
};

function InputAdornment(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position,
    ...other
  } = props;
  return (
    <Component
      className={classNamesAny(
        Component,
        classes.root,
        position === "start" && classes.positionStart,
        position === "end" && classes.positionEnd,
        className
      )}
      {...other}
    >
      {typeof children === "string" && !disableTypography ? (
        <Typography color="textSecondary">{children}</Typography>
      ) : (
        children
      )}
    </Component>
  );
}

const defaultProps = (InputAdornment.defaultProps = {
  component: "div",
  disableTypography: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/InputAdornment/InputAdornment').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/InputAdornment/InputAdornment').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/InputAdornment/InputAdornment').Shape> } TDefaultProps */

/** @type { TComponent } */
const InputAdornmentCode = InputAdornment;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  InputAdornmentCode as InputAdornment,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
