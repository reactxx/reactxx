import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
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
      <Avatar className={classNames(classes.avatar)}>H</Avatar>
      <Avatar className={classNames(classes.orangeAvatar)}>N</Avatar>
      <Avatar className={classNames(classes.purpleAvatar)}>OP</Avatar>
    </div>;
}

LetterAvatars['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), LetterAvatars)();