// @inheritedComponent Paper
import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Paper from "../Paper/Paper";
import { capitalize } from '../utils/helpers';
import LinearProgress from '../LinearProgress';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: { ...toAtomic('padding', 8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default
  },

  /* Styles applied to the root element if `position="bottom"`. */
  positionBottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },

  /* Styles applied to the root element if `position="top"`. */
  positionTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },

  /* Styles applied to the root element if `position="static"`. */
  positionStatic: {},

  /* Styles applied to the dots container if `variant="dots"`. */
  dots: {
    display: 'flex',
    flexDirection: 'row'
  },

  /* Styles applied to each dot if `variant="dots"`. */
  dot: { ...toAtomic('margin', '0 2px'),
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: 8,
    height: 8
  },

  /* Styles applied to a dot if `variant="dots"` and this is the active step. */
  dotActive: {
    backgroundColor: theme.palette.primary.main
  },

  /* Styles applied to the Linear Progress component if `variant="progress"`. */
  progress: {
    width: '50%'
  }
});

function MobileStepper(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    activeStep,
    backButton,
    classes,
    className: classNameProp,
    nextButton,
    position,
    steps,
    variant,
    ...other
  } = props;
  const className = classNames(classes.root, classes[`position${capitalize(position)}`], classNameProp);
  return <Paper square elevation={0} className={className} {...other}>
      {backButton}
      {variant === 'dots' && <div className={classNamesStr(classes.dots)}>
          {[...new Array(steps)].map((_, step) => {
        const dotClassName = classNames(classes.dot, step === activeStep && classes.dotActive); // eslint-disable-next-line react/no-array-index-key

        return <div key={step} className={classNamesStr(dotClassName)} />;
      })}
        </div>}
      {variant === 'progress' && <LinearProgress className={classes.progress} variant="determinate" value={Math.ceil(activeStep / (steps - 1) * 100)} />}
      {nextButton}
    </Paper>;
}

const defaultProps = MobileStepper.defaultProps = {
  activeStep: 0,
  position: 'bottom',
  variant: 'dots'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/MobileStepper/MobileStepper').Shape>}
*/
export const MobileStepperCreator = withStyles(styles, MobileStepper, {
  isMui: true,
  defaultProps
});
const MobileStepperComponent = MobileStepperCreator();
if (MobileStepper.muiName) MobileStepperComponent.muiName = MobileStepper.muiName;
export default MobileStepperComponent;