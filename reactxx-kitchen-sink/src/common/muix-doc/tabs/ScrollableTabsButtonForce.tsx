import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';
import PhoneIcon from 'reactxx-icons/Phone';
import FavoriteIcon from 'reactxx-icons/Favorite';
import PersonPinIcon from 'reactxx-icons/PersonPin';
import HelpIcon from 'reactxx-icons/Help';
import ShoppingBasket from 'reactxx-icons/ShoppingBasket';
import ThumbDown from 'reactxx-icons/ThumbDown';
import ThumbUp from 'reactxx-icons/ThumbUp';
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

class ScrollableTabsButtonForce extends React.Component<any, any> {
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
          <Tabs value={value} onChange={this.handleChange} scrollable scrollButtons="on" indicatorColor="primary" textColor="primary">
            <Tab label="Item One" icon={<PhoneIcon />} />
            <Tab label="Item Two" icon={<FavoriteIcon />} />
            <Tab label="Item Three" icon={<PersonPinIcon />} />
            <Tab label="Item Four" icon={<HelpIcon />} />
            <Tab label="Item Five" icon={<ShoppingBasket />} />
            <Tab label="Item Six" icon={<ThumbDown />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />
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

ScrollableTabsButtonForce['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ScrollableTabsButtonForce)();