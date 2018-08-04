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

const styles = theme => ({
  /* Styles applied to the root element. */
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    "&:last-child": {
      paddingBottom: 24
    }
  })
});

function CardContent(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    component: Component,
    ...other
  } = props;
  return (
    <Component
      className={classNamesAny(Component, classes.root, className)}
      {...other}
    />
  );
}

const defaultProps = (CardContent.defaultProps = {
  component: "div"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/CardContent/CardContent').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/CardContent/CardContent').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/CardContent/CardContent').Shape> } TDefaultProps */

/** @type { TComponent } */
const CardContentCode = CardContent;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CardContentCode as CardContent,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
