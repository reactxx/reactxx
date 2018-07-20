import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from '../StepIcon';
export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '&$alternativeLabel': {
      flexDirection: 'column'
    },
    '&$disabled': {
      cursor: 'default'
    }
  },
  horizontal: {},
  vertical: {},
  active: {},
  completed: {},
  alternativeLabel: {},
  error: {},
  disabled: {},
  label: {
    color: theme.palette.text.secondary,
    '&$active': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&$completed': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&$alternativeLabel': {
      textAlign: 'center',
      marginTop: 16
    },
    '&$error': {
      color: theme.palette.error.main
    }
  },
  iconContainer: {
    paddingRight: 8,
    '&$alternativeLabel': {
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
export default withStyles(styles, {
  name: 'MuiStepLabel',
  defaultProps: {
    active: false,
    alternativeLabel: false,
    completed: false,
    disabled: false,
    error: false,
    last: false,
    orientation: 'horizontal'
  }
})(StepLabel);