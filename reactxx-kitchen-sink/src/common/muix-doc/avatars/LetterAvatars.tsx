import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
import deepOrange from 'reactxx-mui-web/colors/deepOrange';
import deepPurple from 'reactxx-mui-web/colors/deepPurple';
const styles = {
  avatar: {
    margin: 10
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500]
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
};

function LetterAvatars(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.row)}>
      <Avatar className={classes.avatar}>H</Avatar>
      <Avatar className={classes.orangeAvatar}>N</Avatar>
      <Avatar className={classes.purpleAvatar}>OP</Avatar>
    </div>;
}

LetterAvatars['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), LetterAvatars)();