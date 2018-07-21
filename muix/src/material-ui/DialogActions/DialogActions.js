import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { cloneChildrenWithClassName } from '../utils/reactHelpers';
import '../Button'; // So we don't have any override priority issue.

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: '0 0 auto',
    margin: '8px 4px'
  },
  action: {
    margin: '0 4px'
  }
};

function DialogActions(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    disableActionSpacing,
    children,
    classes,
    className,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, className)} {...other}>
      {disableActionSpacing ? children : cloneChildrenWithClassName(children, classes.action)}
    </div>;
}

const defaultProps = {
  disableActionSpacing: false
};
const meta = {
  component: DialogActions || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;