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
const styles = {
  /* Styles applied to the root element. */
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },

  /* Styles applied to the root element if `row={true}`. */
  row: {
    flexDirection: "row"
  }
};

/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */
function FormGroup(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    children,
    row,
    ...other
  } = props;
  return (
    <div
      className={classNamesStr(classes.root, row && classes.row, className)}
      {...other}
    >
      {children}
    </div>
  );
}

const defaultProps = (FormGroup.defaultProps = {
  row: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/FormGroup/FormGroup').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/FormGroup/FormGroup').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/FormGroup/FormGroup').Shape> } TDefaultProps */

/** @type { TComponent } */
const FormGroupCode = FormGroup;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  FormGroupCode as FormGroup,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
