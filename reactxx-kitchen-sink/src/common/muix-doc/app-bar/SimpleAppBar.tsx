import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar/Toolbar';
import Typography from 'reactxx-muix/current/Typography/Typography';
const styles = {
  root: {
    flexGrow: 1
  }
};

function SimpleAppBar(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.root)}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </div>;
}

SimpleAppBar['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleAppBar)();