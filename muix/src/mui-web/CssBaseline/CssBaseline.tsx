//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import PropTypes from "prop-types";
import exactProp from "../utils/exactProp";
export interface CssBaselineProps {
  children?: React.ReactElement<any>;
}
export type CssBaselineClassKey = "@global";

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

class CssBaseline extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;

  render() {
    return this.props.children;
  }
}

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CssBaselineClassKey>,
  props: CssBaselineProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = CssBaseline.defaultProps = {
  children: null
} as CodeProps;
export const CssBaselineCode: CodeComponentType = CssBaseline as any
export const CssBaselineStyles: SheetCreatorX = styles as any
export const CssBaselineCreator: WithStyleCreator = withStyles<Shape>(CssBaselineStyles, CssBaselineCode, {isMui:true, defaultProps});
export const CssBaselineComponent: React.ComponentClass<PropsX> = CssBaselineCreator();
if ((CssBaseline as any).muiName) (CssBaselineComponent as any).muiName = (CssBaseline as any).muiName;


export default CssBaselineComponent
