import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';

import { rulesetToClassNames } from 'muix-styles/web'
import { AppContainer } from 'muix-styles'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    //height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});



class ResponsiveDrawer extends React.Component<any> {
  state = {
    mobileOpen: false,
  };
  myStyle = styles(this.props.theme)
  root = rulesetToClassNames(this.myStyle.root as any)
  appFrame = rulesetToClassNames(this.myStyle.appFrame as any)
  appBar = rulesetToClassNames(this.myStyle.appBar as any)
  navIconHide = rulesetToClassNames(this.myStyle.navIconHide as any)
  content = rulesetToClassNames(this.myStyle.content as any)
  drawerPaper = rulesetToClassNames(this.myStyle.drawerPaper as any)
  //content = rulesetToClassNames(this.myStyle.content as any)


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>mailFolderListItems</List>
        <Divider />
        <List>otherMailFolderListItems</List>
      </div>
    );


    return (
      <div className={this.root}>
        <div className={this.appFrame}>
          <AppBar className={this.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={this.navIconHide}
              >
                x
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Responsive drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              classes={{
                paper: this.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: this.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={this.content}>
            <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
          </main>
        </div>
      </div>
    );
  }
}

const Root = withStyles(styles as any, { withTheme: true })(ResponsiveDrawer);

const app: React.SFC = () => <AppContainer>
  <Root/>
</AppContainer>

export default Root 

