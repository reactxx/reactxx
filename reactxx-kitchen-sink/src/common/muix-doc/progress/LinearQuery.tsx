import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import LinearProgress from 'reactxx-muix/current/LinearProgress/LinearProgress';
const styles = {
  root: {
    flexGrow: 1
  }
};

function LinearQuery(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <LinearProgress variant="query" />
      <br />
      <LinearProgress color="secondary" variant="query" />
    </div>;
}

LinearQuery['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), LinearQuery)();