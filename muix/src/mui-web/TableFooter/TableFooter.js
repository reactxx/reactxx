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
export const styles = {
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

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableFooter/TableFooter').Shape>}
 */
export const TableFooterCreator = withStyles(styles, TableFooter, {
  isMui: true,
  defaultProps
});
const TableFooterComponent = TableFooterCreator();
if (TableFooter.muiName) TableFooterComponent.muiName = TableFooter.muiName;
export default TableFooterComponent;
