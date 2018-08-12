import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import CircularProgress from 'reactxx-muix/current/CircularProgress/CircularProgress';
import purple from 'reactxx-mui-web/colors/purple';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function CircularIndeterminate(props) {
  const {
    classes
  } = props;
  return <div>
      <CircularProgress className={classNames(classes.progress)} />
      <CircularProgress className={classNames(classes.progress)} size={50} />
      <CircularProgress className={classNames(classes.progress)} color="secondary" />
      <CircularProgress className={classNames(classes.progress)} style={({
      color: purple[500]
    } as any)} thickness={7} />
    </div>;
}

CircularIndeterminate['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CircularIndeterminate)();