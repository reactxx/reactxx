import React from 'react';
import PropTypes from 'prop-types';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';
export const styles = theme => ({
  root: {
    display: 'block',
    color: theme.palette.text.disabled,
    '&$active': {
      color: theme.palette.primary.main
    },
    '&$completed': {
      color: theme.palette.primary.main
    },
    '&$error': {
      color: theme.palette.error.main
    }
  },
  text: {
    fill: theme.palette.primary.contrastText,
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily
  },
  active: {},
  completed: {},
  error: {}
});

function StepIcon(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    completed,
    icon,
    active,
    error,
    classes
  } = props;

  if (typeof icon === 'number' || typeof icon === 'string') {
    if (error) {
      return <Warning className={classNames(classes.root, classes.error)} />;
    }

    if (completed) {
      return <CheckCircle className={classNames(classes.root, classes.completed)} />;
    }

    return <SvgIcon className={classNames(classes.root, active && classes.active)}>
        <circle cx="12" cy="12" r="12" />
        <text className={classNamesStr(classes.text)} x="12" y="16" textAnchor="middle">
          {icon}
        </text>
      </SvgIcon>;
  }

  return icon;
}

const defaultProps = {
  active: false,
  completed: false,
  error: false
};
const meta = {
  component: StepIcon || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;