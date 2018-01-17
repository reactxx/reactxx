import React from 'react';
import List from 'material-ui/List';

//import IconButton from 'material-ui/IconButton'
//import Drawer from 'material-ui/Drawer'
//import AppBar from 'material-ui/AppBar'
//import Toolbar from 'material-ui/Toolbar'
//import Typography from 'material-ui/Typography'
//import Hidden from 'material-ui/Hidden'
//import Divider from 'material-ui/Divider'
//import { withStyles } from 'material-ui/styles';

import Drawer from 'muix-components/Drawer/Drawer'
import AppBar from 'muix-components/AppBar/AppBar'
import Toolbar from 'muix-components/Toolbar/Toolbar'
import { Typography } from 'muix-primitives'
import Hidden from 'muix-components/Hidden/Hidden'
import Divider from 'muix-components/Divider/Divider'
import IconButton from 'muix-components/IconButton/IconButton'


import { rulesetToClassNames } from 'muix-styles/web'
import { AppContainer, sheetCreator, withStyles } from 'muix-styles'
import { ViewX } from 'muix-primitives'

const drawerWidth = 240;

type Shape = Overwrite<Muix.DefaultEmptyShape, {
  common: Muix.ShapeViews<'root' | 'appFrame' | 'appBar' | 'drawerHeader' | 'drawerPaper' | 'content'>
  propsNative: {}
  propsWeb: {}
}>

const styles = sheetCreator<Shape>(theme => ({
  //const styles = theme => ({
  root: {
    width: '100%',
    flex: 1,
    //height: 430,
    //marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    $web: {
      overflow: 'hidden',
    },
    position: 'relative',
  },
  appFrame: {
    //width: '100%',
    //height: '100%',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  drawerHeader: {
    $web: theme.mixins.toolbar,
  },
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
}))

const impl = 'css'

class ResponsiveDrawer extends React.Component<Muix.CodeProps<Shape>> {
  state = {
    mobileOpen: false,
    tabletOpen: false
  }

  handleMobileToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleTabletToggle = () => {
    this.setState({ tabletOpen: !this.state.tabletOpen });
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = <ViewX>
      <ViewX classNameInCode={classes.drawerHeader} >
        <Hidden smDown mdUp>
          <IconButton onClick={this.handleTabletToggle}>x</IconButton>
        </Hidden>
      </ViewX>
      <Divider />
      <List>mailFolderListItems</List>
      <Divider />
      <List>otherMailFolderListItems</List>
    </ViewX>


    return <ViewX classNameInCode={classes.root}>
      <AppBar classNameInCode={classes.appBar}>
        <Toolbar>
          <Hidden smUp>
            <IconButton color="contrast" onClick={this.handleMobileToggle}>x</IconButton>
          </Hidden>
          <Hidden smDown mdUp>
            <IconButton color="contrast" onClick={this.handleTabletToggle}>x</IconButton>
          </Hidden>
          <Typography type="title" color="inherit" noWrap>
            Responsive drawer
              </Typography>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          type="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          classesInCode={{ paper: classes.drawerPaper, }}
          open={this.state.mobileOpen}
          onClose={this.handleMobileToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown mdUp>
        <Drawer type="persistent" open={this.state.tabletOpen} onClose={this.handleTabletToggle} classesInCode={{ paper: classes.drawerPaper, }}>
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer type="permanent" open classesInCode={{ paper: classes.drawerPaper, }}>
          {drawer}
        </Drawer>
      </Hidden>
      <ViewX classNameInCode={classes.content}>
        <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
      </ViewX>
    </ViewX>
  }
}

const Root = withStyles(styles, { name: '' as any })(ResponsiveDrawer);

const app: React.SFC = () => <AppContainer>
  <Root />
</AppContainer>

export default app

      //<ViewX classNameInCode={classes.appFrame}>
      //</ViewX>
