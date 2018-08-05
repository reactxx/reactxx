//autogenerated--------------------------------------------------------------------
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
export const styles = {
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

export const defaultProps = (Card.defaultProps = {
  raised: false
});

export const CardCode = Card;
export const CardCreator = withStyles(styles, Card, {
  isMui: true,
  defaultProps
});
export const CardComponent = CardCreator();
if (Card.muiName) CardComponent.muiName = Card.muiName;
export default CardComponent;
