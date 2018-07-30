import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from '../StepIcon';
export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '&.alternativeLabel72': {
      flexDirection: 'column'
    },
    '&.disabled72': {
      cursor: 'default'
    }
  },
  horizontal: {},
  vertical: {},
  active: {
    NAME$active72: true
  },
  completed: {
    NAME$completed72: true
  },
  alternativeLabel: {
    NAME$alternativeLabel72: true
  },
  error: {
    NAME$error72: true
  },
  disabled: {
    NAME$disabled72: true
  },
  label: {
    color: theme.palette.text.secondary,
    '&.active72': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&.completed72': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&.alternativeLabel72': {
      textAlign: 'center',
      marginTop: 16
    },
    '&.error72': {
      color: theme.palette.error.main
    }
  },
  iconContainer: {
    paddingRight: 8,
    '&.alternativeLabel72': {
      paddingRight: 0
    }
  },
  labelContainer: {
    width: '100%'
  }
});

function StepLabel(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    disabled,
    error,
    icon,
    last,
    optional,
    orientation,
    StepIconProps,
    ...other
  } = props;
  return <span className={classNamesStr(classes.root, classes[orientation], disabled && classes.disabled, alternativeLabel && classes.alternativeLabel, error && classes.error, classNameProp)} {...other}>
      {icon && <span className={classNamesStr(classes.iconContainer, alternativeLabel && classes.alternativeLabel)}>
          <StepIcon completed={completed} active={active} error={error} icon={icon} {...StepIconProps} />
        </span>}
      <span className={classNamesStr(classes.labelContainer)}>
        <Typography variant="body1" component="span" className={classNames(classes.label, alternativeLabel && classes.alternativeLabel, completed && classes.completed, active && classes.active, error && classes.error)}>
          {children}
        </Typography>
        {optional}
      </span>
    </span>;
}

StepLabel.muiName = 'StepLabel';
const defaultProps = {
  active: false,
  alternativeLabel: false,
  completed: false,
  disabled: false,
  error: false,
  last: false,
  orientation: 'horizontal'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/StepLabel/StepLabel').Shape>}
*/
export const StepLabelCreator = withStyles(styles, StepLabel, {
  isMui: true,
  defaultProps
});
const StepLabelComponent = StepLabelCreator();
export default StepLabelComponent;