import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: { ...toAtomic('padding', '0 24px 24px'),
    flex: '1 1 auto',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
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
      classNamesAny,
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

const defaultProps = DialogContent.defaultProps = {};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/DialogContent/DialogContent').Shape>}
*/
export const DialogContentCreator = withStyles(styles, DialogContent, {
  isMui: true,
  defaultProps
});
const DialogContentComponent = DialogContentCreator();
if (DialogContent.muiName) DialogContentComponent.muiName = DialogContent.muiName;
export default DialogContentComponent;