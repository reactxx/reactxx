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
import { capitalize } from "../utils/helpers";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: theme.mixins.gutters({
    boxSizing: "border-box",
    lineHeight: "48px",
    listStyle: "none",
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14)
  }),

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: "inherit"
  },

  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    paddingLeft: 72
  },

  /* Styles applied to the root element if `disableSticky={false}`. */
  sticky: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "inherit"
  }
});

function ListSubheader(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    color,
    component: Component,
    disableSticky,
    inset,
    ...other
  } = props;
  return (
    <Component
      className={classNamesAny(
        Component,
        classes.root,
        color !== "default" && classes[`color${capitalize(color)}`],
        inset && classes.inset,
        !disableSticky && classes.sticky,
        className
      )}
      {...other}
    />
  );
}

ListSubheader.muiName = "ListSubheader";
const defaultProps = (ListSubheader.defaultProps = {
  color: "default",
  component: "li",
  disableSticky: false,
  inset: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/ListSubheader/ListSubheader').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/ListSubheader/ListSubheader').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/ListSubheader/ListSubheader').Shape> } TDefaultProps */

/** @type { TComponent } */
const ListSubheaderCode = ListSubheader;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ListSubheaderCode as ListSubheader,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};