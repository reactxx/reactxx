//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from 'react';
import Switch from 'reactxx-muix/current/Switch/Switch';

class Switches extends React.Component<any,any> {
  state: any = {
    checkedA: true,
    checkedB: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.checkedA}
          onChange={this.handleChange('checkedA')}
          value="checkedA"
        />
        <Switch
          checked={this.state.checkedB}
          onChange={this.handleChange('checkedB')}
          value="checkedB"
          color="primary"
        />
        <Switch value="checkedC" />
        <Switch disabled value="checkedD" />
        <Switch disabled checked value="checkedE" />
        <Switch defaultChecked value="checkedF" color="default" />
      </div>
    );
  }
}

export default Switches;