import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import Paper from 'reactxx-muix/current/Paper/Paper';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';

class DisabledTabs extends React.Component<any, any> {
  state: any = {
    value: 2
  };
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    return <Paper>
        <Tabs value={this.state.value} indicatorColor="primary" textColor="primary" onChange={this.handleChange}>
          <Tab label="Active" />
          <Tab label="Disabled" disabled />
          <Tab label="Active" />
        </Tabs>
      </Paper>;
  }

}

export default DisabledTabs;