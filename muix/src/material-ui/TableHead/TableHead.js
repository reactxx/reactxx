import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    display: 'table-header-group'
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

TableHead.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = {
  component: 'thead'
};
const meta = {
  component: TableHead || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;