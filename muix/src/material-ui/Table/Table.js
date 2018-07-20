import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
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

Table.childContextTypes = {
  table: PropTypes.object
};
export default withStyles(styles, {
  name: 'MuiTable',
  defaultProps: {
    component: 'table'
  }
})(Table);