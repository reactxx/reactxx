import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Radio from 'reactxx-muix/current/Radio/Radio';
import RadioGroup from 'reactxx-muix/current/RadioGroup/RadioGroup';
import FormHelperText from 'reactxx-muix/current/FormHelperText/FormHelperText';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import FormLabel from 'reactxx-muix/current/FormLabel/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component<any, any> {
  state: any = {
    value: 'female'
  };
  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <div className={classNamesStr(classes.root)}>
        <FormControl component="fieldset" className={classNames(classes.formControl)}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="Gender" name="gender1" className={classNames(classes.group)} value={this.state.value} onChange={this.handleChange}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classNames(classes.formControl)}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender2" className={classNames(classes.group)} value={this.state.value} onChange={this.handleChange}>
            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" labelPlacement="start" />
            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" labelPlacement="start" />
            <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" labelPlacement="start" />
            <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" labelPlacement="start" />
          </RadioGroup>
          <FormHelperText>labelPlacement start</FormHelperText>
        </FormControl>
      </div>;
  }

}

RadioButtonsGroup['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), RadioButtonsGroup)();