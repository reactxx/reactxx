//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent ButtonBase
import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import { fade } from "../styles/colorManipulator";
import ButtonBase from "../ButtonBase/ButtonBase";
import { capitalize } from "../utils/helpers";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", 0),
    textAlign: "center",
    flex: "0 0 auto",
    fontSize: theme.typography.pxToRem(24),
    width: 48,
    height: 48,
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
      "&.disabled43": {
        backgroundColor: "transparent"
      }
    },
    "&.disabled43": {
      color: theme.palette.action.disabled
    }
  },

  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: "inherit"
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
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
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
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
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled43: true
  },

  /* Styles applied to the children container element. */
  label: {
    width: "100%",
    display: "flex",
    alignItems: "inherit",
    justifyContent: "inherit"
  }
});
/**
 * Refer to the [Icons](/style/icons) section of the documentation
 * regarding the available icon options.
 */

function IconButton(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    color,
    disabled,
    ...other
  } = props;
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
      {...other}
    >
      <span className={classNamesStr(classes.label)}>{children}</span>
    </ButtonBase>
  );
}

const defaultProps = (IconButton.defaultProps = {
  color: "default",
  disabled: false
});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/IconButton/IconButton').Shape>}
 */
export const IconButtonCreator = withStyles(styles, IconButton, {
  isMui: true,
  defaultProps
});
const IconButtonComponent = IconButtonCreator();
if (IconButton.muiName) IconButtonComponent.muiName = IconButton.muiName;
export default IconButtonComponent;
