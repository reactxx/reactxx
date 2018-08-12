import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import Paper from 'reactxx-muix/current/Paper/Paper';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';
import PhoneIcon from 'reactxx-icons/Phone';
import FavoriteIcon from 'reactxx-icons/Favorite';
import PersonPinIcon from 'reactxx-icons/PersonPin';
export default class IconTabs extends React.Component<any, any> {
  state: any = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    return <Paper style={{
      width: 500
    }}>
        <Tabs value={this.state.value} onChange={this.handleChange} fullWidth indicatorColor="primary" textColor="primary">
          <Tab icon={<PhoneIcon />} />
          <Tab icon={<FavoriteIcon />} />
          <Tab icon={<PersonPinIcon />} />
        </Tabs>
      </Paper>;
  }

}