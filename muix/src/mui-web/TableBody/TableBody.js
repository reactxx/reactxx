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
    display: "table-row-group"
  }
};

class TableBody extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        body: true
      }
    };
  }

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      classes,
      className,
      component: Component,
      ...other
    } = this.props;
    return (
      <Component
        className={classNamesAny(Component, classes.root, className)}
        {...other}
      />
    );
  }
}

TableBody.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = (TableBody.defaultProps = {
  component: "tbody"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/TableBody/TableBody').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/TableBody/TableBody').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/TableBody/TableBody').Shape> } TDefaultProps */

/** @type { TComponent } */
const TableBodyCode = TableBody;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TableBodyCode as TableBody,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
