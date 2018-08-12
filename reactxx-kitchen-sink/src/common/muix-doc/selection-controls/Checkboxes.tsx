import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import Checkbox from 'reactxx-muix/current/Checkbox/Checkbox';

class Checkboxes extends React.Component<any, any> {
  state: any = {
    checkedA: true,
    checkedB: true,
    checkedF: true
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  };

  render() {
    return <div>
        <Checkbox checked={this.state.checkedA} onChange={this.handleChange('checkedA')} value="checkedA" />
        <Checkbox checked={this.state.checkedB} onChange={this.handleChange('checkedB')} value="checkedB" color="primary" />
        <Checkbox value="checkedC" />
        <Checkbox disabled value="checkedD" />
        <Checkbox disabled checked value="checkedE" />
        <Checkbox checked={this.state.checkedF} onChange={this.handleChange('checkedF')} value="checkedF" indeterminate />
        <Checkbox defaultChecked color="default" value="checkedG" />
      </div>;
  }

}

export default Checkboxes;