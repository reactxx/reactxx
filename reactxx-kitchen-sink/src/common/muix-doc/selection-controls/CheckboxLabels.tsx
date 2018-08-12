import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import green from 'reactxx-mui-web/colors/green';
import FormGroup from 'reactxx-muix/current/FormGroup/FormGroup';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
import Checkbox from 'reactxx-muix/current/Checkbox/Checkbox';
import CheckBoxOutlineBlankIcon from 'reactxx-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from 'reactxx-icons/CheckBox';
import Favorite from 'reactxx-icons/Favorite';
import FavoriteBorder from 'reactxx-icons/FavoriteBorder';
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {},
  size: {
    width: 40,
    height: 40
  },
  sizeIcon: {
    fontSize: 20
  }
};

class CheckboxLabels extends React.Component<any, any> {
  state: any = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
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
    return <FormGroup row>
        <FormControlLabel control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />} label="Secondary" />
        <FormControlLabel control={<Checkbox checked={this.state.checkedB} onChange={this.handleChange('checkedB')} value="checkedB" color="primary" />} label="Primary" />
        <FormControlLabel control={<Checkbox value="checkedC" />} label="Uncontrolled" />
        <FormControlLabel disabled control={<Checkbox value="checkedD" />} label="Disabled" />
        <FormControlLabel disabled control={<Checkbox checked value="checkedE" />} label="Disabled" />
        <FormControlLabel control={<Checkbox checked={this.state.checkedF} onChange={this.handleChange('checkedF')} value="checkedF" indeterminate />} label="Indeterminate" />
        <FormControlLabel control={<Checkbox checked={this.state.checkedG} onChange={this.handleChange('checkedG')} value="checkedG" classes={{
        root: classes.root,
        checked: classes.checked
      }} />} label="Custom color" />
        <FormControlLabel control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />} label="Custom icon" />
        <FormControlLabel control={<Checkbox className={classes.size} icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />} checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />} value="checkedI" />} label="Custom size" />
      </FormGroup>;
  }

}

CheckboxLabels['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CheckboxLabels)();