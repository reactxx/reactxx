//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent Typography
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import Typography from "../Typography/Typography";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary
  }
});

function DialogContentText(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    ...other
  } = props;
  return (
    <Typography
      component="p"
      variant="subheading"
      className={classNames(classes.root, className)}
      {...other}
    >
      {children}
    </Typography>
  );
}

const defaultProps = (DialogContentText.defaultProps = {});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/DialogContentText/DialogContentText').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/DialogContentText/DialogContentText').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/DialogContentText/DialogContentText').Shape> } TDefaultProps */

/** @type { TComponent } */
const DialogContentTextCode = DialogContentText;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  DialogContentTextCode as DialogContentText,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
