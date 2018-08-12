import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  }
};

function ImageAvatars(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.row)}>
      <Avatar alt="Remy Sharp" src="src/ks/common/muix/static/images/remy.jpg" className={classes.avatar} />
      <Avatar alt="Adelle Charles" src="src/ks/common/muix/static/images/uxceo-128.jpg" className={classNames(classes.avatar, classes.bigAvatar)} />
    </div>;
}

ImageAvatars['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ImageAvatars)();