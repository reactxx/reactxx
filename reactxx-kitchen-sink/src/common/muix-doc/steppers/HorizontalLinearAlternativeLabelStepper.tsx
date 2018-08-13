import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Stepper from 'reactxx-muix/current/Stepper/Stepper';
import Step from 'reactxx-muix/current/Step/Step';
import StepLabel from 'reactxx-muix/current/StepLabel/StepLabel';
import Button from 'reactxx-muix/current/Button/Button';
import Typography from 'reactxx-muix/current/Typography/Typography';

const styles = theme => ({
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';

    case 1:
      return 'What is an ad group anyways?';

    case 2:
      return 'This is the bit I really care about!';

    default:
      return 'Uknown stepIndex';
  }
}

class HorizontalLabelPositionBelowStepper extends React.Component<any, any> {
  state: any = {
    activeStep: 0
  };
  handleNext = () => {
    const {
      activeStep
    } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };
  handleBack = () => {
    const {
      activeStep
    } = this.state;
    this.setState({
      activeStep: activeStep - 1
    });
  };
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const steps = getSteps();
    const {
      activeStep
    } = this.state;
    return <div className={classNamesStr(classes.root)}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
          return <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>;
        })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? <div>
              <Typography className={classNames(classes.instructions)}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div> : <div>
              <Typography className={classNames(classes.instructions)}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classNames(classes.backButton)}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>}
        </div>
      </div>;
  }

}

HorizontalLabelPositionBelowStepper['propTypes'] = {
  classes: PropTypes.object
};
export default withStylesCreator((styles as any), HorizontalLabelPositionBelowStepper)();