//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "../styles";
import exactProp from "../utils/exactProp";

const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased",
      // Antialiasing.
      MozOsxFontSmoothing: "grayscale",
      // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: "border-box"
    },
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      backgroundColor: theme.palette.background.default,
      "@media print": {
        // Save printer ink.
        backgroundColor: theme.palette.common.white
      }
    }
  }
});
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

class CssBaseline extends React.Component {
  render() {
    return this.props.children;
  }
}

CssBaseline.propTypes = exactProp(CssBaseline.propTypes);
const defaultProps = (CssBaseline.defaultProps = {
  children: null
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/CssBaseline/CssBaseline').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/CssBaseline/CssBaseline').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/CssBaseline/CssBaseline').Shape> } TDefaultProps */

/** @type { TComponent } */
const CssBaselineCode = CssBaseline;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CssBaselineCode as CssBaseline,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
