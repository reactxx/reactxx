import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: { ...toAtomic('padding', '8px 4px'),
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: { ...toAtomic('padding', '8px 12px')
    }
  },

  /* Styles applied to the children. */
  action: { ...toAtomic('margin', '0 4px')
  }
});

function CardActions(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
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
if (CardActions.muiName) CardActionsComponent.muiName = CardActions.muiName;
export default CardActionsComponent;