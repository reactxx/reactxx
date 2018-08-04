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
import { isHorizontal } from "../Drawer/Drawer";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer - 1
  },
  anchorLeft: {
    right: "auto"
  },
  anchorRight: {
    left: "auto",
    right: 0
  },
  anchorTop: {
    bottom: "auto",
    right: 0
  },
  anchorBottom: {
    top: "auto",
    bottom: 0,
    right: 0
  }
});

/**
 * @ignore - internal component.
 */
function SwipeArea(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    anchor,
    classes,
    width,
    ...other
  } = props;
  return (
    <div
      className={classNamesStr(
        classes.root,
        classes[`anchor${capitalize(anchor)}`]
      )}
      style={{
        [isHorizontal(props) ? "width" : "height"]: width
      }}
      {...other}
    />
  );
}

const defaultProps = (SwipeArea.defaultProps = {});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/SwipeArea/SwipeArea').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/SwipeArea/SwipeArea').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/SwipeArea/SwipeArea').Shape> } TDefaultProps */

/** @type { TComponent } */
const SwipeAreaCode = SwipeArea;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  SwipeAreaCode as SwipeArea,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
