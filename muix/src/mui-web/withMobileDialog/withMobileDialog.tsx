//autogenerated--------------------------------------------------------------------
//
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "../withWidth/withWidth";
import { Breakpoint } from "../styles/createBreakpoints";
import { WithWidthProps } from "../withWidth";
export interface WithMobileDialogOptions {
  breakpoint: Breakpoint;
}
export interface InjectedProps {
  fullScreen?: boolean;
}
/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server side rendering.
 */

const withMobileDialog = (options: any = {}) => Component => {
  const { breakpoint = "sm" } = options;

  function WithMobileDialog(props) {
    return (
      <Component fullScreen={isWidthDown(breakpoint, props.width)} {...props} />
    );
  }

  (WithMobileDialog as any).propTypes = {
    width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]).isRequired
  };
  return withWidth()(WithMobileDialog);
};

export default withMobileDialog;
