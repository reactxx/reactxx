import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import MenuList from 'reactxx-muix/current/MenuList/MenuList';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';
import Paper from 'reactxx-muix/current/Paper/Paper';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import ListItemIcon from 'reactxx-muix/current/ListItemIcon/ListItemIcon';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import InboxIcon from 'reactxx-icons/MoveToInbox';
import DraftsIcon from 'reactxx-icons/Drafts';
import SendIcon from 'reactxx-icons/Send';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
});

function ListItemComposition(props) {
  const {
    classes
  } = props;
  return <Paper>
      <MenuList>
        <MenuItem className={classNames(classes.menuItem)}>
          <ListItemIcon className={classNames(classes.icon)}>
            <SendIcon />
          </ListItemIcon>
          <ListItemText classes={{
          primary: classes.primary
        }} inset primary="Sent mail" />
        </MenuItem>
        <MenuItem className={classNames(classes.menuItem)}>
          <ListItemIcon className={classNames(classes.icon)}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText classes={{
          primary: classes.primary
        }} inset primary="Drafts" />
        </MenuItem>
        <MenuItem className={classNames(classes.menuItem)}>
          <ListItemIcon className={classNames(classes.icon)}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText classes={{
          primary: classes.primary
        }} inset primary="Inbox" />
        </MenuItem>
      </MenuList>
    </Paper>;
}

ListItemComposition['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ListItemComposition)();