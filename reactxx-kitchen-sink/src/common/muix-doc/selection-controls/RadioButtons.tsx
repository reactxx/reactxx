import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import green from 'reactxx-mui-web/colors/green';
import Radio from 'reactxx-muix/current/Radio/Radio';
import RadioButtonUncheckedIcon from 'reactxx-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from 'reactxx-icons/RadioButtonChecked';
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

class RadioButtons extends React.Component<any, any> {
  state: any = {
    selectedValue: 'a'
  };
  handleChange = event => {
    this.setState({
      selectedValue: event.target.value
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <div>
        <Radio checked={this.state.selectedValue === 'a'} onChange={this.handleChange} value="a" name="radio-button-demo" aria-label="A" />
        <Radio checked={this.state.selectedValue === 'b'} onChange={this.handleChange} value="b" name="radio-button-demo" aria-label="B" />
        <Radio checked={this.state.selectedValue === 'c'} onChange={this.handleChange} value="c" name="radio-button-demo" aria-label="C" classes={{
        root: classes.root,
        checked: classes.checked
      }} />
        <Radio checked={this.state.selectedValue === 'd'} onChange={this.handleChange} value="d" color="default" name="radio-button-demo" aria-label="D" />
        <Radio checked={this.state.selectedValue === 'e'} onChange={this.handleChange} value="e" color="default" name="radio-button-demo" aria-label="E" className={classNames(classes.size)} icon={<RadioButtonUncheckedIcon className={classNames(classes.sizeIcon)} />} checkedIcon={<RadioButtonCheckedIcon className={classNames(classes.sizeIcon)} />} />
      </div>;
  }

}

RadioButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), RadioButtons)();