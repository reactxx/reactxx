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
import Typography from "../Typography/Typography";
import { StandardProps } from "..";
export interface InputAdornmentProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      InputAdornmentClassKey
    > {
  component?: React.ReactType<InputAdornmentProps>;
  disableTypography?: boolean;
  position: "start" | "end";
}
export type InputAdornmentClassKey = "root" | "positionStart" | "positionEnd";
const styles = {
  /* Styles applied to the root element. */
  root: {
    display: "flex",
    maxHeight: "2em",
    alignItems: "center"
  },

  /* Styles applied to the root element if `position="start"`. */
  positionStart: {
    marginRight: 8
  },

  /* Styles applied to the root element if `position="end"`. */
  positionEnd: {
    marginLeft: 8
  }
};

const InputAdornment: Types.CodeSFCWeb<Shape> & {
  muiName?: string;
} = props => {
  const {
    children,
    component: Component,
    classes,
    className,
    disableTypography,
    position,
    ...other
  } = props;
  return (
    <Component
      className={classNames(
        classes.root,
        position === "start" && classes.positionStart,
        position === "end" && classes.positionEnd,
        className
      )}
      {...other as any}
    >
      {typeof children === "string" && !disableTypography ? (
        <Typography color="textSecondary">{children}</Typography>
      ) : (
        children
      )}
    </Component>
  );
};

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<InputAdornmentClassKey>,
  props: InputAdornmentProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = InputAdornment.defaultProps = {
  component: 'div',
  disableTypography: false
} as CodeProps;
export const InputAdornmentCode: CodeComponentType = InputAdornment as any
export const InputAdornmentStyles: SheetCreatorX = styles as any
export const InputAdornmentCreator: WithStyleCreator = withStyles<Shape>(InputAdornmentStyles, InputAdornmentCode, {isMui:true, defaultProps});
export const InputAdornmentComponent: React.ComponentType<PropsX> = InputAdornmentCreator();
if ((InputAdornment as any).muiName) (InputAdornmentComponent as any).muiName = (InputAdornment as any).muiName;


export default InputAdornmentComponent
