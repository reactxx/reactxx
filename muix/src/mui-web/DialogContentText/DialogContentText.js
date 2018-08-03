// @inheritedComponent Typography
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from "../Typography/Typography";
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
      classNamesAny,
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

const defaultProps = DialogContentText.defaultProps = {};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/DialogContentText/DialogContentText').Shape>}
*/
export const DialogContentTextCreator = withStyles(styles, DialogContentText, {
  isMui: true,
  defaultProps
});
const DialogContentTextComponent = DialogContentTextCreator();
if (DialogContentText.muiName) DialogContentTextComponent.muiName = DialogContentText.muiName;
export default DialogContentTextComponent;