import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Drawer from 'reactxx-muix/current/Drawer/Drawer';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar/Toolbar';
import List from 'reactxx-muix/current/List/List';
import Typography from 'reactxx-muix/current/Typography/Typography';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import Hidden from 'reactxx-muix/current/Hidden/Hidden';
import Divider from 'reactxx-muix/current/Divider/Divider';
import MenuIcon from 'reactxx-icons/Menu';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class ResponsiveDrawer extends React.Component<any, any> {
  state: any = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState(state => ({
      mobileOpen: !state.mobileOpen
    }));
  };

  render() {
    const {
      classes,
      theme
    } = this.props;
    const drawer = <div>
        <div className={classNamesStr(classes.toolbar)} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>;
    return <div className={classNamesStr(classes.root)}>
        <AppBar className={classNames(classes.appBar)}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classNames(classes.navIconHide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer variant="temporary" anchor={theme.direction === 'rtl' ? 'right' : 'left'} open={this.state.mobileOpen} onClose={this.handleDrawerToggle} classes={{
          paper: classes.drawerPaper
        }} ModalProps={{
          keepMounted: true // Better open performance on mobile.

        }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer variant="permanent" open classes={{
          paper: classes.drawerPaper
        }}>
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classNamesStr(classes.content)}>
          <div className={classNamesStr(classes.toolbar)} />
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>;
  }

}

ResponsiveDrawer['propTypes'] = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ResponsiveDrawer, {
  withTheme: true
})();