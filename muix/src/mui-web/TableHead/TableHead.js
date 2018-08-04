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

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/TableHead/TableHead').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/TableHead/TableHead').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/TableHead/TableHead').Shape> } TDefaultProps */

/** @type { TComponent } */
const TableHeadCode = TableHead;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  TableHeadCode as TableHead,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
