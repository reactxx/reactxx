import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
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
  button: {
    marginRight: theme.spacing.unit
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
      return 'Select campaign settings...';

    case 1:
      return 'What is an ad group anyways?';

    case 2:
      return 'This is the bit I really care about!';

    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearStepperWithError extends React.Component<any, any> {
  state: any = {
    activeStep: 0,
    skipped: new Set()
  };
  isStepOptional = step => {
    return step === 1;
  };
  isStepFailed = step => {
    return step === 1;
  };
  handleNext = () => {
    const {
      activeStep
    } = this.state;
    let {
      skipped
    } = this.state;

    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    this.setState({
      activeStep: activeStep + 1,
      skipped
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
  handleSkip = () => {
    const {
      activeStep
    } = this.state;

    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
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
  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
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
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
          const props: any = {};
          const labelProps: any = {};

          if (this.isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption" color="error">
                  Alert message
                </Typography>;
          }

          if (this.isStepFailed(index)) {
            labelProps.error = true;
          }

          if (this.isStepSkipped(index)) {
            props.completed = false;
          }

          return <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>;
        })}
        </Stepper>
        <div>
          {activeStep === steps.length ? <div>
              <Typography className={classNames(classes.instructions)}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classNames(classes.button)}>
                Reset
              </Button>
            </div> : <div>
              <Typography className={classNames(classes.instructions)}>{getStepContent(activeStep)}</Typography>
              <div>
                <Button disabled={activeStep === 0} onClick={this.handleBack} className={classNames(classes.button)}>
                  Back
                </Button>
                {this.isStepOptional(activeStep) && <Button variant="contained" color="primary" onClick={this.handleSkip} className={classNames(classes.button)}>
                    Skip
                  </Button>}
                <Button variant="contained" color="primary" onClick={this.handleNext} className={classNames(classes.button)}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>}
        </div>
      </div>;
  }

}

HorizontalNonLinearStepperWithError['propTypes'] = {
  classes: PropTypes.object
};
export default withStylesCreator((styles as any), HorizontalNonLinearStepperWithError)();