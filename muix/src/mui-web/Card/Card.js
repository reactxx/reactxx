// @inheritedComponent Paper
import React from 'react';
import PropTypes from 'prop-types';
import Paper from "../Paper/Paper";
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

const defaultProps = {
  raised: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Card/Card').Shape>}
*/
export const CardCreator = withStyles(styles, Card, {
  isMui: true,
  defaultProps
});
const CardComponent = CardCreator();
export default CardComponent;