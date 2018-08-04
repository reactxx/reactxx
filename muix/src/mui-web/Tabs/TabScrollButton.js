//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import KeyboardArrowLeft from "../internal/svg-icons/KeyboardArrowLeft";
import KeyboardArrowRight from "../internal/svg-icons/KeyboardArrowRight";
import withStyles from "../styles/withStyles";
import ButtonBase from "../ButtonBase/ButtonBase";
const styles = {
  /* Styles applied to the root element. */
  root: {
    color: "inherit",
    flex: "0 0 56px"
  }
};

/**
 * @ignore - internal component.
 */
function TabScrollButton(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className: classNameProp,
    direction,
    onClick,
    visible,
    ...other
  } = props;
  const className = classNames(classes.root, classNameProp);

  if (!visible) {
    return <div className={classNamesStr(className)} />;
  }

  return (
    <ButtonBase
      className={className}
      onClick={onClick}
      tabIndex={-1}
      {...other}
    >
      {direction === "left" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </ButtonBase>
  );
}

const defaultProps = (TabScrollButton.defaultProps = {
  visible: true
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/TabScrollButton/TabScrollButton').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/TabScrollButton/TabScrollButton').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/TabScrollButton/TabScrollButton').Shape> } TDefaultProps */

/** @type { TComponent } */
const TabScrollButtonCode = TabScrollButton;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TabScrollButtonCode as TabScrollButton,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
