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
    display: "table-footer-group"
  }
};

class TableFooter extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        footer: true
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

TableFooter.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = (TableFooter.defaultProps = {
  component: "tfoot"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/TableFooter/TableFooter').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/TableFooter/TableFooter').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/TableFooter/TableFooter').Shape> } TDefaultProps */

/** @type { TComponent } */
const TableFooterCode = TableFooter;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TableFooterCode as TableFooter,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
