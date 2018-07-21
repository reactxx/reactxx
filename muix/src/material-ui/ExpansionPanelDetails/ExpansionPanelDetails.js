import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    display: 'flex',
    padding: '8px 24px 24px'
  }
};

function ExpansionPanelDetails(props) {
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
  component: ExpansionPanelDetails || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;