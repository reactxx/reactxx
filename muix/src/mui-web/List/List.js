//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", 0),
    ...toAtomic("margin", 0),
    listStyle: "none",
    position: "relative"
  },

  /* Styles applied to the root element if `disablePddding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8
  },

  /* Styles applied to the root element if `dense={true}` & `disablePddding={false}`. */
  dense: {
    paddingTop: 4,
    paddingBottom: 4
  },

  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0
  }
};

class List extends React.Component {
  getChildContext() {
    return {
      dense: this.props.dense
    };
  }

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      children,
      classes,
      className: classNameProp,
      component: Component,
      dense,
      disablePadding,
      subheader,
      ...other
    } = this.props;
    const className = classNames(
      classes.root,
      dense && !disablePadding && classes.dense,
      !disablePadding && classes.padding,
      subheader && classes.subheader,
      classNameProp
    );
    return (
      <Component className={classNamesAny(Component, className)} {...other}>
        {subheader}
        {children}
      </Component>
    );
  }
}

List.childContextTypes = {
  dense: PropTypes.bool
};
const defaultProps = (List.defaultProps = {
  component: "ul",
  dense: false,
  disablePadding: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/List/List').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/List/List').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/List/List').Shape> } TDefaultProps */

/** @type { TComponent } */
const ListCode = List;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  ListCode as List,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
