import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';
import Typography from 'reactxx-muix/current/Typography/Typography';

function TabContainer(props) {
  return <Typography component="div" style={{
    padding: 8 * 3
  }}>
      {props.children}
    </Typography>;
}

TabContainer['propTypes'] = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

class ScrollableTabsButtonAuto extends React.Component<any, any> {
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
    const {
      value
    } = this.state;
    return <div className={classNamesStr(classes.root)}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" scrollable scrollButtons="auto">
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>;
  }

}

ScrollableTabsButtonAuto['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ScrollableTabsButtonAuto)();