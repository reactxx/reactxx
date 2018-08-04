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
import { capitalize } from "../utils/helpers";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("margin", 0),
    display: "block"
  },

  /* Styles applied to the root element if `variant="display4"`. */
  display4: theme.typography.display4,

  /* Styles applied to the root element if `variant="display3"`. */
  display3: theme.typography.display3,

  /* Styles applied to the root element if `variant="display2"`. */
  display2: theme.typography.display2,

  /* Styles applied to the root element if `variant="display1"`. */
  display1: theme.typography.display1,

  /* Styles applied to the root element if `variant="headline"`. */
  headline: theme.typography.headline,

  /* Styles applied to the root element if `variant="title"`. */
  title: theme.typography.title,

  /* Styles applied to the root element if `variant="subheading"`. */
  subheading: theme.typography.subheading,

  /* Styles applied to the root element if `variant="body2"`. */
  body2: theme.typography.body2,

  /* Styles applied to the root element if `variant="body1"`. */
  body1: theme.typography.body1,

  /* Styles applied to the root element if `variant="caption"`. */
  caption: theme.typography.caption,

  /* Styles applied to the root element if `variant="button"`. */
  button: theme.typography.button,

  /* Styles applied to the root element if `align="left"`. */
  alignLeft: {
    textAlign: "left"
  },

  /* Styles applied to the root element if `align="center"`. */
  alignCenter: {
    textAlign: "center"
  },

  /* Styles applied to the root element if `align="right"`. */
  alignRight: {
    textAlign: "right"
  },

  /* Styles applied to the root element if `align="justify"`. */
  alignJustify: {
    textAlign: "justify"
  },

  /* Styles applied to the root element if `align="nowrap"`. */
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },

  /* Styles applied to the root element if `gutterBottom={true}`. */
  gutterBottom: {
    marginBottom: "0.35em"
  },

  /* Styles applied to the root element if `paragraph={true}`. */
  paragraph: {
    marginBottom: 16
  },

  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: "inherit"
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main
  },

  /* Styles applied to the root element if `color="textPrimary"`. */
  colorTextPrimary: {
    color: theme.palette.text.primary
  },

  /* Styles applied to the root element if `color="textSecondary"`. */
  colorTextSecondary: {
    color: theme.palette.text.secondary
  },

  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main
  }
});

function Typography(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    align,
    classes,
    className: classNameProp,
    color,
    component: componentProp,
    gutterBottom,
    headlineMapping,
    noWrap,
    paragraph,
    variant,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    classes[variant],
    color !== "default" && classes[`color${capitalize(color)}`],
    noWrap && classes.noWrap,
    gutterBottom && classes.gutterBottom,
    paragraph && classes.paragraph,
    align !== "inherit" && classes[`align${capitalize(align)}`],
    classNameProp
  );
  const Component =
    componentProp || (paragraph ? "p" : headlineMapping[variant]) || "span";
  return (
    <Component className={classNamesAny(Component, className)} {...other} />
  );
}

const defaultProps = (Typography.defaultProps = {
  align: "inherit",
  color: "default",
  gutterBottom: false,
  headlineMapping: {
    display4: "h1",
    display3: "h1",
    display2: "h1",
    display1: "h1",
    headline: "h1",
    title: "h2",
    subheading: "h3",
    body2: "aside",
    body1: "p"
  },
  noWrap: false,
  paragraph: false,
  variant: "body1"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Typography/Typography').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Typography/Typography').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Typography/Typography').Shape> } TDefaultProps */

/** @type { TComponent } */
const TypographyCode = Typography;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TypographyCode as Typography,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
