import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    flex: '1 1 auto'
  },
  horizontal: {},
  vertical: {
    marginLeft: 12,
    // half icon
    padding: '0 0 8px'
  },
  alternativeLabel: {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)'
  },
  line: {
    display: 'block',
    borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  },
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1
  },
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24
  }
});

function StepConnector(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    alternativeLabel,
    className: classNameProp,
    classes,
    orientation,
    ...other
  } = props;
  const className = classNames(classes.root, classes[orientation], alternativeLabel && classes.alternativeLabel, classNameProp);
  const lineClassName = classNames(classes.line, orientation === 'horizontal' && classes.lineHorizontal, orientation === 'vertical' && classes.lineVertical);
  return <div className={classNamesStr(className)} {...other}>
      <span className={classNamesStr(lineClassName)} />
    </div>;
}

export default withStyles(styles, {
  name: 'MuiStepConnector',
  defaultProps: {
    alternativeLabel: false,
    orientation: 'horizontal'
  }
})(StepConnector);