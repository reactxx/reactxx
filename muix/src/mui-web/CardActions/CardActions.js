import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '8px 4px',
    [theme.breakpoints.up('sm')]: {
      padding: '8px 12px'
    }
  },

  /* Styles applied to the children. */
  action: {
    margin: '0 4px'
  }
});

function CardActions(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    disableActionSpacing,
    children,
    classes,
    className,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, className)} {...other}>
      {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
    </div>;
}

const defaultProps = CardActions.defaultProps = {
  disableActionSpacing: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/CardActions/CardActions').Shape>}
*/
export const CardActionsCreator = withStyles(styles, CardActions, {
  isMui: true,
  defaultProps
});
const CardActionsComponent = CardActionsCreator();
export default CardActionsComponent;