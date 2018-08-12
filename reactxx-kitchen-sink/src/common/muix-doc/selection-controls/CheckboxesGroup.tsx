import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import FormLabel from 'reactxx-muix/current/FormLabel/FormLabel';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import FormGroup from 'reactxx-muix/current/FormGroup/FormGroup';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
import FormHelperText from 'reactxx-muix/current/FormHelperText/FormHelperText';
import Checkbox from 'reactxx-muix/current/Checkbox/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  }
});

class CheckboxesGroup extends React.Component<any, any> {
  state: any = {
    gilad: true,
    jason: false,
    antoine: false
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      gilad,
      jason,
      antoine
    } = this.state;
    const error = Object.values(this.state).filter(v => v).length !== 2;
    return <div className={classNamesStr(classes.root)}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={gilad} onChange={this.handleChange('gilad')} value="gilad" />} label="Gilad Gray" />
            <FormControlLabel control={<Checkbox checked={jason} onChange={this.handleChange('jason')} value="jason" />} label="Jason Killian" />
            <FormControlLabel control={<Checkbox checked={antoine} onChange={this.handleChange('antoine')} value="antoine" />} label="Antoine Llorca" />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={gilad} onChange={this.handleChange('gilad')} value="gilad" />} label="Gilad Gray" />
            <FormControlLabel control={<Checkbox checked={jason} onChange={this.handleChange('jason')} value="jason" />} label="Jason Killian" />
            <FormControlLabel control={<Checkbox checked={antoine} onChange={this.handleChange('antoine')} value="antoine" />} label="Antoine Llorca" />
          </FormGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </div>;
  }

}

CheckboxesGroup['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CheckboxesGroup)();