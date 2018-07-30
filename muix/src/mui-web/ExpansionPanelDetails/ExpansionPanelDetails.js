import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    padding: '8px 24px 24px'
  }
};

function ExpansionPanelDetails(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    classes,
    children,
    className,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, className)} {...other}>
      {children}
    </div>;
}

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ExpansionPanelDetails/ExpansionPanelDetails').Shape>}
*/
export const ExpansionPanelDetailsCreator = withStyles(styles, ExpansionPanelDetails, {
  isMui: true,
  defaultProps
});
const ExpansionPanelDetailsComponent = ExpansionPanelDetailsCreator();
export default ExpansionPanelDetailsComponent;