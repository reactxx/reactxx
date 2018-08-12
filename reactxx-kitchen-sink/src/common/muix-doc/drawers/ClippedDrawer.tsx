import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Drawer from 'reactxx-muix/current/Drawer/Drawer';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar/Toolbar';
import List from 'reactxx-muix/current/List/List';
import Typography from 'reactxx-muix/current/Typography/Typography';
import Divider from 'reactxx-muix/current/Divider/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works

  },
  toolbar: theme.mixins.toolbar
});

function ClippedDrawer(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }}>
        <div className={classNamesStr(classes.toolbar)} />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </Drawer>
      <main className={classNamesStr(classes.content)}>
        <div className={classNamesStr(classes.toolbar)} />
        <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
      </main>
    </div>;
}

ClippedDrawer['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ClippedDrawer)();