import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import TextField from 'reactxx-muix/current/TextField/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function DateAndTimePickers(props) {
  const {
    classes
  } = props;
  return <form className={classNamesStr(classes.container)} noValidate>
      <TextField id="datetime-local" label="Next appointment" type="datetime-local" defaultValue="2017-05-24T10:30" className={classNames(classes.textField)} InputLabelProps={{
      shrink: true
    }} />
    </form>;
}

DateAndTimePickers['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), DateAndTimePickers)();