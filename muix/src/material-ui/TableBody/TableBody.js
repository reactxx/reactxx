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
    return <Component className={classNames(classes.root, className)} {...other} />;
  }

}

TableBody.childContextTypes = {
  table: PropTypes.object
};
const defaultProps = {
  component: 'tbody'
};
const meta = {
  component: TableBody || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;