import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import List from 'reactxx-muix/current/List/List';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
import ImageIcon from 'reactxx-icons/Image';
import WorkIcon from 'reactxx-icons/Work';
import BeachAccessIcon from 'reactxx-icons/BeachAccess';
import Divider from 'reactxx-muix/current/Divider/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

function InsetDividers(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <List>
        <ListItem>
          <Avatar>
            <ImageIcon />
          </Avatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <li>
          <Divider inset />
        </li>
        <ListItem>
          <Avatar>
            <WorkIcon />
          </Avatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <Divider inset component="li" />
        <ListItem>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </div>;
}

InsetDividers['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), InsetDividers)();