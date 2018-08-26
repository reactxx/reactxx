//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import { StandardProps } from "..";
export interface ToolbarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ToolbarClassKey> {
  variant?: "regular" | "dense";
  disableGutters?: boolean;
}
export type ToolbarClassKey = "root" | "gutters" | "regular" | "dense";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  /* Styles applied to the root element if `disableGutters={false}`. */
  gutters: theme.mixins.gutters(),

  /* Styles applied to the root element if `variant="regular"`. */
  regular: theme.mixins.toolbar,

  /* Styles applied to the root element if `variant="dense"`. */
  dense: {
    minHeight: 48
  }
});

const Toolbar: Types.CodeSFCWeb<Shape> & {
  muiName?: string;
} = props => {
  const {
    children,
    classes,
    className: classNameProp,
    disableGutters,
    variant,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    classes[variant],
    !disableGutters && classes.gutters,
    classNameProp
  );
  return (
    <div className={className} {...other as any}>
      {children}
    </div>
  );
};

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ToolbarClassKey>,
  props: ToolbarProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = Toolbar.defaultProps = {
  disableGutters: false,
  variant: 'regular'
} as CodeProps;
export const ToolbarCode: CodeComponentType = Toolbar as any
export const ToolbarStyles: SheetCreatorX = styles as any
export const ToolbarCreator: WithStyleCreator = withStyles<Shape>(ToolbarStyles, ToolbarCode, {isMui:true, defaultProps});
export const ToolbarComponent: React.ComponentType<PropsX> = ToolbarCreator();
if ((Toolbar as any).muiName) (ToolbarComponent as any).muiName = (Toolbar as any).muiName;


export default ToolbarComponent
