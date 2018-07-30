// @inheritedComponent Typography
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary
  }
});

function DialogContentText(props) {
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
  return <Typography component="p" variant="subheading" className={classNames(classes.root, className)} {...other}>
      {children}
    </Typography>;
}

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/DialogContentText/DialogContentText').Shape>}
*/
export const DialogContentTextCreator = withStyles(styles, DialogContentText, {
  isMui: true,
  defaultProps
});
const DialogContentTextComponent = DialogContentTextCreator();
export default DialogContentTextComponent;