//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

// @inheritedComponent Input
import React from "react";
import PropTypes from "prop-types";
import SelectInput from "./SelectInput";
import withStyles from "../styles/withStyles";
import mergeClasses from "../styles/mergeClasses";
import ArrowDropDownIcon from "../internal/svg-icons/ArrowDropDown";
import Input from "../Input/Input";
import { styles as nativeSelectStyles } from "../NativeSelect/NativeSelect";
import NativeSelectInput from "../NativeSelect/NativeSelectInput";
const styles = nativeSelectStyles;

function Select(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    autoWidth,
    children,
    classes,
    displayEmpty,
    IconComponent,
    input,
    inputProps,
    MenuProps,
    multiple,
    native,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    ...other
  } = props;
  const inputComponent = native ? NativeSelectInput : SelectInput;
  return React.cloneElement(input, {
    // Most of the logic is implemented in `SelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent,
    inputProps: {
      children,
      IconComponent,
      type: undefined,
      // We render a select. We can ignore the type provided by the `Input`.
      ...(native
        ? {}
        : {
            autoWidth,
            displayEmpty,
            MenuProps,
            multiple,
            onClose,
            onOpen,
            open,
            renderValue,
            SelectDisplayProps
          }),
      ...inputProps,
      classes: inputProps
        ? mergeClasses({
            baseClasses: classes,
            newClasses: inputProps.classes,
            Component: Select
          })
        : classes,
      ...(input ? input.props.inputProps : {})
    },
    ...other
  });
}

Select.muiName = "Select";
const defaultProps = (Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  IconComponent: ArrowDropDownIcon,
  input: <Input />,
  multiple: false,
  native: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Select/Select').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Select/Select').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Select/Select').Shape> } TDefaultProps */

/** @type { TComponent } */
const SelectCode = Select;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  SelectCode as Select,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
