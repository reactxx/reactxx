import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    display: 'table-footer-group'
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

TableFooter.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = {
  component: 'tfoot'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableFooter/TableFooter').Shape>}
*/
export const TableFooterCreator = withStyles(styles, TableFooter, {
  isMui: true,
  defaultProps
});
const TableFooterComponent = TableFooterCreator();
export default TableFooterComponent;