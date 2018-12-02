//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
// @inheritedComponent ButtonBase
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import { fade } from "../styles/colorManipulator";
import ButtonBase from "../ButtonBase/ButtonBase";
import { capitalize } from "../utils/helpers";
import { StandardProps, PropTypes as muiPropTypes } from "..";
import { ButtonBaseProps } from "../ButtonBase/ButtonBase";
export interface IconButtonProps
  extends StandardProps<ButtonBaseProps, IconButtonClassKey> {
  color?: muiPropTypes.Color;
  disabled?: boolean;
  disableRipple?: boolean;
}
export type IconButtonClassKey =
  | "root"
  | "colorInherit"
  | "colorPrimary"
  | "colorSecondary"
  | "disabled"
  | "label";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    $web: {
      textAlign: "center",
      flex: "0 0 auto",
      fontSize: theme.typography.pxToRem(24),
      width: 48,
      height: 48,
      padding: 0,
      borderRadius: "50%",
      color: theme.palette.action.active,
      transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.shortest
      }),
      "&:hover": {
        backgroundColor: fade(
          theme.palette.action.active,
          theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        },
        "&.disabled44": {
          backgroundColor: "transparent"
        }
      },
      "&.disabled44": {
        color: theme.palette.action.disabled
      }
    }
  },

  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    $web: {
      color: "inherit"
    }
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    $web: {
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    $web: {
      color: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: fade(
          theme.palette.secondary.main,
          theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    }
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    $web: {
      NAME$disabled44: true
    }
  },

  /* Styles applied to the children container element. */
  label: {
    $web: {
      width: "100%",
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit"
    }
  }
});
/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */

const IconButton: Types.CodeSFCWeb<Shape> & {
  muiName?: string;
} = props => {
  const { children, classes, className, color, disabled, ...other } = props;
  return (
    <ButtonBase
      className={classNames(
        classes.root,
        color !== "default" && classes[`color${capitalize(color)}`],
        disabled && classes.disabled,
        className
      )}
      centerRipple
      focusRipple
      disabled={disabled}
      {...other as any}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
};

export interface Shape extends Types.ShapeDefault {
  common: TCommon.ShapeTexts<IconButtonClassKey>,
  props: IconButtonProps
  style: 'Text'
  theme: Theme
}
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = IconButton.defaultProps = {
  color: 'default',
  disabled: false
} as CodeProps;
export const IconButtonCode: CodeComponentType = IconButton as any
export const IconButtonStyles: SheetCreatorX = styles as any
export const IconButtonCreator: WithStyleCreator = withStyles<Shape>(IconButtonStyles, IconButtonCode, {isMui:true, defaultProps});
export const IconButtonComponent: React.ComponentType<PropsX> = IconButtonCreator();
if ((IconButton as any).muiName) (IconButtonComponent as any).muiName = (IconButton as any).muiName;


export default IconButtonComponent