//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";
import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    paddingLeft: 8,
    paddingRight: 8,
    "&:first-child": {
      paddingLeft: 0
    },
    "&:last-child": {
      paddingRight: 0
    }
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {},

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    flex: 1,
    position: "relative"
  }
};

function Step(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    connector,
    disabled,
    index,
    last,
    orientation,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    classes[orientation],
    alternativeLabel && classes.alternativeLabel,
    classNameProp
  );
  return (
    <div className={classNamesStr(className)} {...other}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        warning(
          child.type !== React.Fragment,
          [
            "Material-UI: the Step component doesn't accept a Fragment as a child.",
            "Consider providing an array instead."
          ].join("\n")
        );
        return React.cloneElement(child, {
          active,
          alternativeLabel,
          completed,
          disabled,
          icon: index + 1,
          last,
          orientation,
          ...child.props
        });
      })}
      {connector &&
        alternativeLabel &&
        !last &&
        React.cloneElement(connector, {
          orientation,
          alternativeLabel
        })}
    </div>
  );
}

const defaultProps = (Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/Step/Step').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/Step/Step').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/Step/Step').Shape> } TDefaultProps */

/** @type { TComponent } */
const StepCode = Step;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  StepCode as Step,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
