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
    return <Component className={classNames(classes.root, className)} {...other} />;
  }

}

TableFooter.childContextTypes = {
  table: PropTypes.object
};
export default withStyles(styles, {
  name: 'MuiTableFooter',
  defaultProps: {
    component: 'tfoot'
  }
})(TableFooter);