import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import ListSubheader from 'reactxx-muix/current/ListSubheader/ListSubheader';
import List from 'reactxx-muix/current/List/List';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemIcon from 'reactxx-muix/current/ListItemIcon/ListItemIcon';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import Collapse from 'reactxx-muix/current/Collapse/Collapse';
import InboxIcon from 'reactxx-icons/MoveToInbox';
import DraftsIcon from 'reactxx-icons/Drafts';
import SendIcon from 'reactxx-icons/Send';
import ExpandLess from 'reactxx-icons/ExpandLess';
import ExpandMore from 'reactxx-icons/ExpandMore';
import StarBorder from 'reactxx-icons/StarBorder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NestedList extends React.Component<any, any> {
  state: any = {
    open: true
  };
  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
    const {
      classes
    } = this.props;
    return <div className={classNamesStr(classes.root)}>
        <List component="nav" subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classNames(classes.nested)}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText inset primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>;
  }

}

NestedList['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), NestedList)();