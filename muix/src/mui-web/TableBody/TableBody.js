import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'table-row-group'
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
      $system: {
        classNames,
        classNamesStr,
        theme
      },
      classes,
      className,
      component: Component,
      ...other
    } = this.props;
    return <Component className={classNamesStr(classes.root, className)} {...other} />;
  }

}

TableBody.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = TableBody.defaultProps = {
  component: 'tbody'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableBody/TableBody').Shape>}
*/
export const TableBodyCreator = withStyles(styles, TableBody, {
  isMui: true,
  defaultProps
});
const TableBodyComponent = TableBodyCreator();
TableBodyComponent.muiName = TableBody.muiName;
export default TableBodyComponent;