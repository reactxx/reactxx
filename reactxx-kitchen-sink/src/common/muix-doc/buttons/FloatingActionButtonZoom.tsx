import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Tabs from 'reactxx-muix/current/Tabs/Tabs';
import Tab from 'reactxx-muix/current/Tab/Tab';
import Typography from 'reactxx-muix/current/Typography/Typography';
import Zoom from 'reactxx-muix/current/Zoom/Zoom';
import Button from 'reactxx-muix/current/Button/Button';
import AddIcon from 'reactxx-icons/Add';
import EditIcon from 'reactxx-icons/Edit';
import UpIcon from 'reactxx-icons/KeyboardArrowUp';
import green from 'reactxx-mui-web/colors/green';

function TabContainer(props) {
  const {
    children,
    dir
  } = props;
  return <Typography component="div" dir={dir} style={{
    padding: 8 * 3
  }}>
      {children}
    </Typography>;
}

TabContainer['propTypes'] = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500]
  }
});

class FloatingActionButtonZoom extends React.Component<any, any> {
  state: any = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };
  handleChangeIndex = index => {
    this.setState({
      value: index
    });
  };

  render() {
    const {
      classes,
      theme
    } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen
    };
    const fabs = [{
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />
    }, {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />
    }, {
      color: 'inherit',
      className: classNames(classes.fab, classes.fabGreen),
      icon: <UpIcon />
    }];
    return <div className={classNamesStr(classes.root)}>
        <AppBar position="static" color="default">
          <Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" fullWidth>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={this.state.value} onChangeIndex={this.handleChangeIndex}>
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
        {fabs.map((fab, index) => <Zoom key={fab.color} in={this.state.value === index} timeout={transitionDuration} style={{
        transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`
      }} unmountOnExit>
            <Button variant="fab" className={fab.className} color={fab.color}>
              {fab.icon}
            </Button>
          </Zoom>)}
      </div>;
  }

}

FloatingActionButtonZoom['propTypes'] = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), FloatingActionButtonZoom, {
  withTheme: true
})();