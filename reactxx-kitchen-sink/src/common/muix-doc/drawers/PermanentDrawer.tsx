import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Drawer from 'reactxx-muix/current/Drawer/Drawer';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar/Toolbar';
import List from 'reactxx-muix/current/List/List';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';
import TextField from 'reactxx-muix/current/TextField/TextField';
import Typography from 'reactxx-muix/current/Typography/Typography';
import Divider from 'reactxx-muix/current/Divider/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  'appBar-left': {
    marginLeft: drawerWidth
  },
  'appBar-right': {
    marginRight: drawerWidth
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class PermanentDrawer extends React.Component<any, any> {
  state: any = {
    anchor: 'left'
  };
  handleChange = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      anchor
    } = this.state;
    const drawer = <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }} anchor={anchor}>
        <div className={classNamesStr(classes.toolbar)} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </Drawer>;
    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }

    return <div className={classNamesStr(classes.root)}>
        <TextField id="permanent-anchor" select label="Anchor" value={anchor} onChange={this.handleChange} margin="normal">
          <MenuItem value="left">left</MenuItem>
          <MenuItem value="right">right</MenuItem>
        </TextField>
        <div className={classNamesStr(classes.appFrame)}>
          <AppBar position="absolute" className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Permanent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main className={classNamesStr(classes.content)}>
            <div className={classNamesStr(classes.toolbar)} />
            <Typography>{'You think water moves fast? You should see ice.'}</Typography>
          </main>
          {after}
        </div>
      </div>;
  }

}

PermanentDrawer['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), PermanentDrawer)();