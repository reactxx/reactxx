//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent Paper
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Paper from "../Paper/Paper";
import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: "hidden"
  }
};

function Card(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    raised,
    ...other
  } = props;
  return (
    <Paper
      className={classNames(classes.root, className)}
      elevation={raised ? 8 : 1}
      {...other}
    />
  );
}

const defaultProps = (Card.defaultProps = {
  raised: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Card/Card').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Card/Card').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Card/Card').Shape> } TDefaultProps */

/** @type { TComponent } */
const CardCode = Card;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CardCode as Card,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
