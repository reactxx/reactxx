import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import List from 'reactxx-muix/current/List/List';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemIcon from 'reactxx-muix/current/ListItemIcon/ListItemIcon';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import Divider from 'reactxx-muix/current/Divider/Divider';
import InboxIcon from 'reactxx-icons/Inbox';
import DraftsIcon from 'reactxx-icons/Drafts';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function SimpleList(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button component="a" href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </div>;
}

SimpleList['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleList)();