// @inheritedComponent Paper
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Paper from "../Paper/Paper";
import { capitalize } from '../utils/helpers';
import LinearProgress from '../LinearProgress';
export const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: theme.palette.background.default,
    padding: 8
  },
  positionBottom: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },
  positionTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.mobileStepper
  },
  positionStatic: {},
  dots: {
    display: 'flex',
    flexDirection: 'row'
  },
  dot: {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: '50%',
    width: 8,
    height: 8,
    margin: '0 2px'
  },
  dotActive: {
    backgroundColor: theme.palette.primary.main
  },
  progress: {
    width: '50%'
  }
});

function MobileStepper(props) {
  const {
    $system: {
      classNames,
      classNamesStr
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

const defaultProps = {
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
export default MobileStepperComponent;