import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'table',
    fontFamily: theme.typography.fontFamily,
    width: '100%',
    borderCollapse: 'collapse',
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

Table.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = Table.defaultProps = {
  component: 'table'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Table/Table').Shape>}
*/
export const TableCreator = withStyles(styles, Table, {
  isMui: true,
  defaultProps
});
const TableComponent = TableCreator();
export default TableComponent;