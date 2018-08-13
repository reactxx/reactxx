import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Paper from 'reactxx-muix/current/Paper/Paper';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';
const styles = {
  root: {
    flexGrow: 1
  }
};

class CenteredTabs extends React.Component<any, any> {
  state: any = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <Paper className={classNames(classes.root)}>
        <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>;
  }

}

CenteredTabs['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CenteredTabs)();