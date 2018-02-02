//import React from 'react';
//import List from 'material-ui/List';
//import IconButton from 'material-ui/IconButton';

//import Drawer from 'material-ui/Drawer';
//import AppBar from 'material-ui/AppBar';
//import Toolbar from 'material-ui/Toolbar';
//import Typography from 'material-ui/Typography';
//import Hidden from 'material-ui/Hidden';
//import Divider from 'material-ui/Divider';

////import Drawer from 'muix-components/Drawer/Drawer'
////import AppBar from 'muix-components/AppBar/AppBar'
////import Toolbar from 'muix-components/Toolbar/Toolbar'
////import { Typography } from 'muix-primitives'
////import Hidden from 'muix-components/Hidden/Hidden'
////import Divider from 'muix-components/Divider/Divider'

//import { withStyles } from 'material-ui/styles';

//import { rulesetToClassNames } from 'muix-styles/web'
//import { AppContainer, sheetCreator } from 'muix-styles'
//import { ViewX } from 'muix-primitives'

//const drawerWidth = 240;


////const sheet = sheetCreator<any>(({ typographyX: typoX, spacing, breakpoints, mixins, palette }) => ({
//const styles = theme => ({
//  root: {
//    width: '100%',
//    //height: 430,
//    marginTop: theme.spacing.unit * 3,
//    zIndex: 1,
//    overflow: 'hidden',
//  },
//  appFrame: {
//    position: 'relative',
//    display: 'flex',
//    width: '100%',
//    height: '100%',
//  },
//  appBar: {
//    marginLeft: drawerWidth,
//    [theme.breakpoints.up('md')]: {
//      width: `calc(100% - ${drawerWidth}px)`,
//    },
//  },
//  navIconHide: {
//    [theme.breakpoints.up('md')]: {
//      display: 'none',
//    },
//  },
//  navIconShow: {
//    [theme.breakpoints.down('sm')]: {
//      display: 'none',
//    },
//    [theme.breakpoints.up('lg')]: {
//      display: 'none',
//    }
//  },
//  drawerHeader: theme.mixins.toolbar,
//  drawerPaper: {
//    width: 250, 
//    [theme.breakpoints.up('md')]: {
//      width: drawerWidth,
//      position: 'relative',
//      height: '100%',
//    },
//  },
//  content: {
//    backgroundColor: theme.palette.background.default,
//    width: '100%',
//    padding: theme.spacing.unit * 3,
//    height: 'calc(100% - 56px)',
//    marginTop: 56,
//    [theme.breakpoints.up('sm')]: {
//      height: 'calc(100% - 64px)',
//      marginTop: 64,
//    },
//  },
//  showMobile: {
//    [theme.breakpoints.up('sm')]: {
//      display:'none'
//    }
//  },
//  showTablet: {
//    [theme.breakpoints.down('sm')]: {
//      display: 'none'
//    },
//    [theme.breakpoints.up('md')]: {
//      display: 'none'
//    },
//  },
//  showTabletMobile: {
//    [theme.breakpoints.up('md')]: {
//      display: 'none'
//    }
//  },
//  showDesktop: {
//    [theme.breakpoints.down('md')]: {
//      display: 'none'
//    }
//  },
//});

//const impl = 'css'

//class ResponsiveDrawer extends React.Component<any> {
//  state = {
//    mobileOpen: false,
//    //tabletOpen: false
//  };
//  myStyle = styles(this.props.theme)
//  root = rulesetToClassNames(this.myStyle.root as any)
//  appFrame = rulesetToClassNames(this.myStyle.appFrame as any)
//  appBar = rulesetToClassNames(this.myStyle.appBar as any)
//  navIconHide = rulesetToClassNames(this.myStyle.navIconHide as any)
//  content = rulesetToClassNames(this.myStyle.content as any)
//  drawerPaper = rulesetToClassNames(this.myStyle.drawerPaper as any)
//  drawerHeader = rulesetToClassNames(this.myStyle.drawerHeader as any)
//  navIconShow = rulesetToClassNames(this.myStyle.navIconShow as any)
//  showTablet = rulesetToClassNames(this.myStyle.showTablet as any)
//  showDesktop = rulesetToClassNames(this.myStyle.showDesktop as any)
//  showMobile = rulesetToClassNames(this.myStyle.showMobile as any)
//  showTabletMobile = rulesetToClassNames(this.myStyle.showTabletMobile as any)

//  handleMobileToggle = () => {
//    this.setState({ mobileOpen: !this.state.mobileOpen });
//  };

//  handleTabletDrawerToggle = () => {
//    this.setState({ tabletOpen: !this.state.mobileOpen });
//  };

//  render() {
//    const { classes, theme } = this.props;

//    const drawer = <div>
//      <div className={this.drawerHeader} >
//        <IconButton onClick={this.handleMobileToggle} className={this.showTablet}>x</IconButton>
//      </div>
//      <Divider />
//      <List>mailFolderListItems</List>
//      <Divider />
//      <List>otherMailFolderListItems</List>
//    </div>


//    return (
//      <div className={this.root}>
//        <div className={this.appFrame}>
//          <AppBar className={this.appBar}>
//            <Toolbar>
//              <IconButton color="contrast" onClick={this.handleMobileToggle} className={this.showTabletMobile}>x</IconButton>
//              <Typography type="title" color="inherit" noWrap>
//                Responsive drawer
//              </Typography>
//            </Toolbar>
//          </AppBar>
//          <Hidden smUp>
//            <Drawer
//              type="temporary"
//              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//              classes={{ paper: this.drawerPaper, }}
//              open={this.state.mobileOpen}
//              onClose={this.handleMobileToggle}
//              ModalProps={{
//                keepMounted: true, // Better open performance on mobile.
//              }}>
//              {drawer}
//            </Drawer>
//          </Hidden>
//          <Hidden only={['md']}>
//            <Drawer
//              type="persistent"
//              open={this.state.mobileOpen}
//              onClose={this.handleTabletDrawerToggle}
//              classes={{ paper: this.drawerPaper, }}>
//              {drawer}
//            </Drawer>
//          </Hidden>
//          <Hidden mdDown>
//            <Drawer
//              type="permanent"
//              open
//              classes={{ paper: this.drawerPaper, }}>
//              {drawer}
//            </Drawer>
//          </Hidden>
//          <main className={this.content}>
//            <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
//          </main>
//        </div>
//      </div>
//    );
//  }
//}

//const Root = withStyles(styles as any, { withTheme: true })(ResponsiveDrawer);

//const app: React.SFC = () => <AppContainer>
//  <Root />
//</AppContainer>

//export default app

////          <div className={'showMobile ' + this.showMobile}>
