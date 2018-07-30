import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    margin: 0,
    padding: '24px 24px 20px',
    flex: '0 0 auto'
  }
};

function DialogTitle(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    children,
    classes,
    className,
    disableTypography,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, className)} {...other}>
      {disableTypography ? children : <Typography variant="title">{children}</Typography>}
    </div>;
}

const defaultProps = DialogTitle.defaultProps = {
  disableTypography: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/DialogTitle/DialogTitle').Shape>}
*/
export const DialogTitleCreator = withStyles(styles, DialogTitle, {
  isMui: true,
  defaultProps
});
const DialogTitleComponent = DialogTitleCreator();
export default DialogTitleComponent;