import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import MobileStepper from 'reactxx-muix/current/MobileStepper/MobileStepper';
import Paper from 'reactxx-muix/current/Paper/Paper';
import Typography from 'reactxx-muix/current/Typography/Typography';
import Button from 'reactxx-muix/current/Button/Button';
import KeyboardArrowLeft from 'reactxx-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'reactxx-icons/KeyboardArrowRight';
const tutorialSteps = [{
  label: 'How to be happy :)',
  imgPath: 'src/ks/common/muix/static/images/steppers/1-happy.jpg'
}, {
  label: '1. Work with something that you like, like…',
  imgPath: 'src/ks/common/muix/static/images/steppers/2-work.jpg'
}, {
  label: '2. Keep your friends close to you and hangout with them',
  imgPath: 'src/ks/common/muix/static/images/steppers/3-friends.jpg'
}, {
  label: '3. Travel everytime that you have a chance',
  imgPath: 'src/ks/common/muix/static/images/steppers/4-travel.jpg'
}, {
  label: '4. And contribute to Material-UI :D',
  imgPath: 'src/ks/common/muix/static/images/steppers/5-mui.png'
}];

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%'
  }
});

class TextMobileStepper extends React.Component<any, any> {
  state: any = {
    activeStep: 0
  };
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };
  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  render() {
    const {
      classes,
      theme
    } = this.props;
    const {
      activeStep
    } = this.state;
    const maxSteps = tutorialSteps.length;
    return <div className={classNamesStr(classes.root)}>
        <Paper square elevation={0} className={classNames(classes.header)}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <img className={classNamesStr(classes.img)} src={tutorialSteps[activeStep].imgPath} alt={tutorialSteps[activeStep].label} />
        <MobileStepper steps={maxSteps} position="static" activeStep={activeStep} className={classNames(classes.mobileStepper)} nextButton={<Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>} backButton={<Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>} />
      </div>;
  }

}

TextMobileStepper['propTypes'] = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), TextMobileStepper, {
  withTheme: true
})();