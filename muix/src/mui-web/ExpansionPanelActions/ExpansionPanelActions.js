import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '16px 8px'
  },

  /* Styles applied to the children. */
  action: {
    marginLeft: 8
  }
};

function ExpansionPanelActions(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    children,
    classes,
    className,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, className)} {...other}>
      {cloneChildrenWithClassName(children, classes.action)}
    </div>;
}

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ExpansionPanelActions/ExpansionPanelActions').Shape>}
*/
export const ExpansionPanelActionsCreator = withStyles(styles, ExpansionPanelActions, {
  isMui: true,
  defaultProps
});
const ExpansionPanelActionsComponent = ExpansionPanelActionsCreator();
export default ExpansionPanelActionsComponent;