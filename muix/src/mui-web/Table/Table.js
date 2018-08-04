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
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: "table",
    fontFamily: theme.typography.fontFamily,
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0
  }
});

class Table extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {}
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

Table.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = (Table.defaultProps = {
  component: "table"
});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Table/Table').Shape>}
 */
export const TableCreator = withStyles(styles, Table, {
  isMui: true,
  defaultProps
});
const TableComponent = TableCreator();
if (Table.muiName) TableComponent.muiName = Table.muiName;
export default TableComponent;
