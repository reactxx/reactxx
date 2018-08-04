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
    display: "table-header-group"
  }
};

class TableHead extends React.Component {
  getChildContext() {
    // eslint-disable-line class-methods-use-this
    return {
      table: {
        head: true
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

TableHead.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = (TableHead.defaultProps = {
  component: "thead"
});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableHead/TableHead').Shape>}
 */
export const TableHeadCreator = withStyles(styles, TableHead, {
  isMui: true,
  defaultProps
});
const TableHeadComponent = TableHeadCreator();
if (TableHead.muiName) TableHeadComponent.muiName = TableHead.muiName;
export default TableHeadComponent;
