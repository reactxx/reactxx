//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";
import withStyles from "../styles/withStyles";

const styles = theme => {
  const elevations = {};
  theme.shadows.forEach((shadow, index) => {
    elevations[`elevation${index}`] = {
      boxShadow: shadow
    };
  });
  return {
    /* Styles applied to the root element. */
    root: {
      backgroundColor: theme.palette.background.paper
    },

    /* Styles applied to the root element if `square={false}`. */
    rounded: {
      borderRadius: theme.shape.borderRadius
    },
    ...elevations
  };
};

function Paper(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className: classNameProp,
    component: Component,
    square,
    elevation,
    ...other
  } = props;
  warning(
    elevation >= 0 && elevation < 25,
    `Material-UI: this elevation \`${elevation}\` is not implemented.`
  );
  const className = classNames(
    classes.root,
    classes[`elevation${elevation}`],
    !square && classes.rounded,
    classNameProp
  );
  return (
    <Component className={classNamesAny(Component, className)} {...other} />
  );
}

const defaultProps = (Paper.defaultProps = {
  component: "div",
  elevation: 2,
  square: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Paper/Paper').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Paper/Paper').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Paper/Paper').Shape> } TDefaultProps */

/** @type { TComponent } */
const PaperCode = Paper;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  PaperCode as Paper,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
