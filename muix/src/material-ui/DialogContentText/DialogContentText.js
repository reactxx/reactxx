// @inheritedComponent Typography
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = theme => ({
  root: {
    color: theme.palette.text.secondary
  }
});

function DialogContentText(props) {
  const {
    $system: {
      classNames,
      classNamesStr
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

const meta = {
  component: DialogContentText || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;