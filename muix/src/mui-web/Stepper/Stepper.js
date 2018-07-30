// @inheritedComponent Paper
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Paper from "../Paper/Paper";
import StepConnector from '../StepConnector';
export const styles = {
  root: {
    display: 'flex',
    padding: 24
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  vertical: {
    flexDirection: 'column'
  },
  alternativeLabel: {
    alignItems: 'flex-start'
  }
};

function Stepper(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    activeStep,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    connector: connectorProp,
    nonLinear,
    orientation,
    ...other
  } = props;
  const className = classNames(classes.root, classes[orientation], alternativeLabel && classes.alternativeLabel, classNameProp);
  const connector = React.isValidElement(connectorProp) ? React.cloneElement(connectorProp, {
    orientation
  }) : null;
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const controlProps = {
      index,
      orientation,
      active: false,
      completed: false,
      disabled: false,
      last: index + 1 === childrenArray.length,
      alternativeLabel,
      connector: connectorProp
    };

    if (activeStep === index) {
      controlProps.active = true;
    } else if (!nonLinear && activeStep > index) {
      controlProps.completed = true;
    } else if (!nonLinear && activeStep < index) {
      controlProps.disabled = true;
    }

    return [!alternativeLabel && connector && index > 0 && React.cloneElement(connector, {
      key: index // eslint-disable-line react/no-array-index-key

    }), React.cloneElement(step, { ...controlProps,
      ...step.props
    })];
  });
  return <Paper square elevation={0} className={className} {...other}>
      {steps}
    </Paper>;
}

Stepper.muiName = 'Stepper';
const defaultProps = {
  activeStep: 0,
  alternativeLabel: false,
  connector: <StepConnector />,
  nonLinear: false,
  orientation: 'horizontal'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Stepper/Stepper').Shape>}
*/
export const StepperCreator = withStyles(styles, Stepper, {
  isMui: true,
  defaultProps
});
const StepperComponent = StepperCreator();
export default StepperComponent;