import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
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
      classNamesStr
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

const meta = {
  component: DialogContent || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;