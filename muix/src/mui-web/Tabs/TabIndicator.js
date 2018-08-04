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
  root: {
    position: "absolute",
    height: 2,
    bottom: 0,
    width: "100%",
    transition: theme.transitions.create(),
    willChange: "left, width"
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main
  }
});

/**
 * @ignore - internal component.
 */
function TabIndicator(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    color,
    ...other
  } = props;
  return (
    <span
      className={classNamesStr(
        classes.root,
        classes[`color${capitalize(color)}`],
        className
      )}
      {...other}
    />
  );
}

const defaultProps = (TabIndicator.defaultProps = {});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/TabIndicator/TabIndicator').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/TabIndicator/TabIndicator').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/TabIndicator/TabIndicator').Shape> } TDefaultProps */

/** @type { TComponent } */
const TabIndicatorCode = TabIndicator;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TabIndicatorCode as TabIndicator,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
