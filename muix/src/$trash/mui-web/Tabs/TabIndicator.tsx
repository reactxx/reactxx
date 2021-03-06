//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import { capitalize } from "../utils/helpers";
import { StandardProps } from "..";
export interface TabIndicatorProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      TabIndicatorClassKey
    > {
  color: "secondary" | "primary" | string;
  style: {
    left: number;
    width: number;
  };
}
export type TabIndicatorClassKey = "root" | "colorSecondary" | "colorPrimary";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    $web: {
      position: "absolute",
      height: 2,
      bottom: 0,
      width: "100%",
      transition: theme.transitions.create(),
      willChange: "left, width"
    }
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    $web: {
      backgroundColor: theme.palette.primary.main
    }
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    $web: {
      backgroundColor: theme.palette.secondary.main
    }
  }
});
/**
 * @ignore - internal component.
 */

const TabIndicator: Types.CodeSFCWeb<Shape> & {
  muiName?: string;
} = props => {
  const { classes, className, color, ...other } = props;
  return (
    <span
      className={classNames(
        classes.root,
        classes[`color${capitalize(color)}`],
        className
      )}
      {...other as any}
    />
  );
};

export interface Shape extends Types.ShapeDefault {
  common: TCommon.ShapeTexts<TabIndicatorClassKey>,
  props: TabIndicatorProps
  style: 'Text'
  theme: Theme
}
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = TabIndicator.defaultProps = {} as CodeProps;
export const TabIndicatorCode: CodeComponentType = TabIndicator as any
export const TabIndicatorStyles: SheetCreatorX = styles as any
export const TabIndicatorCreator: WithStyleCreator = withStyles<Shape>(TabIndicatorStyles, TabIndicatorCode, {isMui:true, defaultProps});
export const TabIndicatorComponent: React.ComponentType<PropsX> = TabIndicatorCreator();
if ((TabIndicator as any).muiName) (TabIndicatorComponent as any).muiName = (TabIndicator as any).muiName;


export default TabIndicatorComponent
