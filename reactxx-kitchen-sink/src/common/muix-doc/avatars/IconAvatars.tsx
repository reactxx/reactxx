import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import pink from 'reactxx-mui-web/colors/pink';
import green from 'reactxx-mui-web/colors/green';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
import FolderIcon from 'reactxx-icons/Folder';
import PageviewIcon from 'reactxx-icons/Pageview';
import AssignmentIcon from 'reactxx-icons/Assignment';
const styles = {
  avatar: {
    margin: 10
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink[500]
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500]
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
};

function IconAvatars(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.row)}>
      <Avatar className={classNames(classes.avatar)}>
        <FolderIcon />
      </Avatar>
      <Avatar className={classNames(classes.pinkAvatar)}>
        <PageviewIcon />
      </Avatar>
      <Avatar className={classNames(classes.greenAvatar)}>
        <AssignmentIcon />
      </Avatar>
    </div>;
}

IconAvatars['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), IconAvatars)();