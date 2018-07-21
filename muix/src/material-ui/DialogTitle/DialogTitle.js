import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = {
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
      classNamesStr
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

const defaultProps = {
  disableTypography: false
};
const meta = {
  component: DialogTitle || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;