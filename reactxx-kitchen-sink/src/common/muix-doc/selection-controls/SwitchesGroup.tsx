import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import FormLabel from 'reactxx-muix/current/FormLabel/FormLabel';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import FormGroup from 'reactxx-muix/current/FormGroup/FormGroup';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
import FormHelperText from 'reactxx-muix/current/FormHelperText/FormHelperText';
import Switch from 'reactxx-muix/current/Switch/Switch';

class SwitchesGroup extends React.Component<any, any> {
  state: any = {
    gilad: true,
    jason: false,
    antoine: true
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    return <FormControl component="fieldset">
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Switch checked={this.state.gilad} onChange={this.handleChange('gilad')} value="gilad" />} label="Gilad Gray" />
          <FormControlLabel control={<Switch checked={this.state.jason} onChange={this.handleChange('jason')} value="jason" />} label="Jason Killian" />
          <FormControlLabel control={<Switch checked={this.state.antoine} onChange={this.handleChange('antoine')} value="antoine" />} label="Antoine Llorca" />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>;
  }

}

export default SwitchesGroup;