import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import MobileStepper from 'reactxx-muix/current/MobileStepper/MobileStepper';
import Button from 'reactxx-muix/current/Button/Button';
import KeyboardArrowLeft from 'reactxx-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'reactxx-icons/KeyboardArrowRight';
const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
};

class ProgressMobileStepper extends React.Component<any, any> {
  state: any = {
    activeStep: 0
  };
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  render() {
    const {
      classes,
      theme
    } = this.props;
    return <MobileStepper variant="progress" steps={6} position="static" activeStep={this.state.activeStep} className={classes.root} nextButton={<Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>} backButton={<Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>} />;
  }

}

ProgressMobileStepper['propTypes'] = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ProgressMobileStepper, {
  withTheme: true
})();