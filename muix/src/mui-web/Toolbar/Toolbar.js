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

function Toolbar(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
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
    <div className={classNamesStr(className)} {...other}>
      {children}
    </div>
  );
}

const defaultProps = (Toolbar.defaultProps = {
  disableGutters: false,
  variant: "regular"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Toolbar/Toolbar').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Toolbar/Toolbar').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Toolbar/Toolbar').Shape> } TDefaultProps */

/** @type { TComponent } */
const ToolbarCode = Toolbar;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ToolbarCode as Toolbar,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
