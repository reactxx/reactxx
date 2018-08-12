import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import LinearProgress from 'reactxx-muix/current/LinearProgress/LinearProgress';
const styles = {
  root: {
    flexGrow: 1
  }
};

function LinearIndeterminate(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <LinearProgress />
      <br />
      <LinearProgress color="secondary" />
    </div>;
}

LinearIndeterminate['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), LinearIndeterminate)();