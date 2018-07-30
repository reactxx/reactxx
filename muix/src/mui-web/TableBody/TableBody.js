import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
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
        classNamesStr
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
const defaultProps = {
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
export default TableBodyComponent;