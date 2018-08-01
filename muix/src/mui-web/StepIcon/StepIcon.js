import React from 'react';
import PropTypes from 'prop-types';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    color: theme.palette.text.disabled,
    '&.active72': {
      color: theme.palette.primary.main
    },
    '&.completed72': {
      color: theme.palette.primary.main
    },
    '&.error72': {
      color: theme.palette.error.main
    }
  },

  /* Styles applied to the SVG text element. */
  text: {
    fill: theme.palette.primary.contrastText,
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily
  },

  /* Styles applied to the root element if `active={true}`. */
  active: {
    NAME$active72: true
  },

  /* Styles applied to the root element if `completed={true}`. */
  completed: {
    NAME$completed72: true
  },

  /* Styles applied to the root element if `error={true}`. */
  error: {
    NAME$error72: true
  }
});

function StepIcon(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
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

const defaultProps = StepIcon.defaultProps = {
  active: false,
  completed: false,
  error: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/StepIcon/StepIcon').Shape>}
*/
export const StepIconCreator = withStyles(styles, StepIcon, {
  isMui: true,
  defaultProps
});
const StepIconComponent = StepIconCreator();
if (StepIcon.muiName) StepIconComponent.muiName = StepIcon.muiName;
export default StepIconComponent;