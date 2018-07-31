import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    // Add iOS momentum scrolling.
    padding: '0 24px 24px',
    '&:first-child': {
      paddingTop: 24
    }
  }
};

function DialogContent(props) {
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
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/DialogContent/DialogContent').Shape>}
*/
export const DialogContentCreator = withStyles(styles, DialogContent, {
  isMui: true,
  defaultProps
});
const DialogContentComponent = DialogContentCreator();
DialogContentComponent.muiName = DialogContent.muiName;
export default DialogContentComponent;