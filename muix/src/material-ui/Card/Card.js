// @inheritedComponent Paper
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    overflow: 'hidden'
  }
};

function Card(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className,
    raised,
    ...other
  } = props;
  return <Paper className={classNames(classes.root, className)} elevation={raised ? 8 : 1} {...other} />;
}

export default withStyles(styles, {
  name: 'MuiCard',
  defaultProps: {
    raised: false
  }
})(Card);