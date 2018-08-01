import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from "../Typography/Typography";
import StepIcon from '../StepIcon';
export const styles = theme => ({
  /* Styles applied to the root element. */
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

  /* Styles applied to the root element if `orientation="horiizontal". */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical". */
  vertical: {},

  /* Styles applied to the `Typography` component which wraps `children`. */
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

  /* Styles applied to the `Typography` component if `active={true}`. */
  active: {
    NAME$active72: true
  },

  /* Styles applied to the `Typography` component if `completed={true}`. */
  completed: {
    NAME$completed72: true
  },

  /* Styles applied to the root element and `Typography` component if `error={true}`. */
  error: {
    NAME$error72: true
  },

  /* Styles applied to the root element and `Typography` component if `disabled={true}`. */
  disabled: {
    NAME$disabled72: true
  },

  /* Styles applied to the `icon` container element. */
  iconContainer: {
    paddingRight: 8,
    '&.alternativeLabel72': {
      paddingRight: 0
    }
  },

  /* Styles applied to the root & icon container and `Typography` if `alternativeLabel={true}`. */
  alternativeLabel: {
    NAME$alternativeLabel72: true
  },

  /* Styles applied to the container element which wraps `Typography` and `optional`. */
  labelContainer: {
    width: '100%'
  }
});

function StepLabel(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
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
const defaultProps = StepLabel.defaultProps = {
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
if (StepLabel.muiName) StepLabelComponent.muiName = StepLabel.muiName;
export default StepLabelComponent;