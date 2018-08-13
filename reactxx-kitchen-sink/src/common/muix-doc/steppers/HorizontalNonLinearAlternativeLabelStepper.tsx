import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Stepper from 'reactxx-muix/current/Stepper/Stepper';
import Step from 'reactxx-muix/current/Step/Step';
import StepButton from 'reactxx-muix/current/StepButton/StepButton';
import Button from 'reactxx-muix/current/Button/Button';
import Typography from 'reactxx-muix/current/Typography/Typography';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: 'inline-block'
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...';

    case 1:
      return 'Step 2: What is an ad group anyways?';

    case 2:
      return 'Step 3: This is the bit I really care about!';

    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component<any, any> {
  state: any = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set()
  };
  totalSteps = () => {
    return getSteps().length;
  };
  isStepOptional = step => {
    return step === 1;
  };
  handleSkip = () => {
    const {
      activeStep
    } = this.state;

    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };
  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }

    this.setState({
      activeStep
    });
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };
  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };
  handleComplete = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed
    });
    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */

    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  };
  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
    });
  };

  skippedSteps() {
    return this.state.skipped.size;
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  render() {
    const {
      classes
    } = this.props;
    const steps = getSteps();
    const {
      activeStep
    } = this.state;
    return <div className={classNamesStr(classes.root)}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
          const props: any = {};
          const buttonProps: any = {};

          if (this.isStepOptional(index)) {
            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
          }

          if (this.isStepSkipped(index)) {
            props.completed = false;
          }

          return <Step key={label} {...props}>
                <StepButton onClick={this.handleStep(index)} completed={this.isStepComplete(index)} {...buttonProps}>
                  {label}
                </StepButton>
              </Step>;
        })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? <div>
              <Typography className={classNames(classes.instructions)}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div> : <div>
              <Typography className={classNames(classes.instructions)}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classNames(classes.button)}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.handleNext} className={classNames(classes.button)}>
                  Next
                </Button>
                {this.isStepOptional(activeStep) && !this.state.completed.has(this.state.activeStep) && <Button variant="contained" color="primary" onClick={this.handleSkip} className={classNames(classes.button)}>
                      Skip
                    </Button>}
                {activeStep !== steps.length && (this.state.completed.has(this.state.activeStep) ? <Typography variant="caption" className={classNames(classes.completed)}>
                      Step {activeStep + 1} already completed
                    </Typography> : <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>)}
              </div>
            </div>}
        </div>
      </div>;
  }

}

HorizontalNonLinearAlternativeLabelStepper['propTypes'] = {
  classes: PropTypes.object
};
export default withStylesCreator((styles as any), HorizontalNonLinearAlternativeLabelStepper)();